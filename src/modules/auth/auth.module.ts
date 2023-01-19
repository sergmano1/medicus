import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from 'src/constans';
import { LocalStrategy } from './guards/local.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MulterModule } from '@nestjs/platform-express';
import { UserRoleService } from '../users_role/users.role.service';
import { UsersRoleModule } from '../users_role/users.role.module';

@Module({
  imports: [
    UsersRoleModule,
    UsersModule,
    PassportModule,
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserRoleService,
    AuthService,
    JwtService,
    JwtAuthGuard,
    JwtStrategy,
    LocalStrategy,
    UserService,
    UserRoleService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
