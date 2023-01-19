import { Module } from '@nestjs/common';
import { UserController } from 'src/modules/users/users.controller';
import { UserService } from './users.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
