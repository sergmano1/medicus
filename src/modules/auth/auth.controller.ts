import {
  Controller,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  Get,
  Req,
  Res,
  UsePipes,
  Request,
} from '@nestjs/common';
import * as fs from 'fs';
import { AuthService } from './auth.service';
import { signInDto } from '../users/dto/signInDto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUsersDto } from '../users/dto/create.users.dto';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { JoiValidationPipe } from '../users/pipe/validation.pipe';
import { createUserSchema } from '../users/dto/user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async login(@Request() req, @Body() signInDto: signInDto) {
    return this.authService.login({
      ...signInDto,
      role: req.user.role,
    });
  }

  @Post('/sign-up')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUsersDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const result = await this.authService.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      role: createUserDto.role,
      avatar: createUserDto.avatar,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return result;
  }
  @Post('/file/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
  ): object {
    return {
      file,
    };
  }

  @Get('file/:filename')
  readFile(@Req() req, @Res() res) {
    const img = fs.readFileSync(
      path.join(__dirname, '../../../../uploads', req.params.filename),
    );
    res.end(img, 'binary');
  }
}
