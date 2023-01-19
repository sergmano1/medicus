import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from 'src/modules/users/users.service';
import { CreateUsersDto } from './dto/create.users.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':email')
  fetchByEmail(@Param('email') email: string) {
    return this.userService.fetchByEmail(email);
  }
  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.userService.destroy(id);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() CreateUsersDto: CreateUsersDto) {
    return this.userService.update(id, CreateUsersDto);
  }
  @Post('/user')
  create(@Body() CreateUsersDto: CreateUsersDto) {
    return this.userService.create(CreateUsersDto);
  }
}
