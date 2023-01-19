import { config } from 'dotenv';
config();
import {
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import UsersModel from 'src/models/users';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authorizationHeader = req.headers.authorization;
      if (
        authorizationHeader &&
        authorizationHeader.indexOf('Bearer ') !== -1
      ) {
        const data = this.jwtService.verify(authorizationHeader.substring(7), {
          secret: process.env.JWT_SECRET,
        }) as JwtPayload | null;
        if (!authorizationHeader || !data) {
          throw new UnauthorizedException({ message: 'Unauthorized' });
        }
        const canActivate = (await super.canActivate(context)) as boolean;
        const user = await UsersModel.fetchById(data.id);
        if (!user || !canActivate) {
          throw new UnauthorizedException({ message: 'Unauthorized' });
        }
        req.user = user;

        return true;
      }
      throw new UnauthorizedException({ message: 'Unauthorized' });
    } catch (e) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
  }
}
