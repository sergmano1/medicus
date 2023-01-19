import { Module } from '@nestjs/common';
import { UsersRoleController } from './users.role.controller';
import { UserRoleService } from './users.role.service';

@Module({
  imports: [],
  controllers: [UsersRoleController],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UsersRoleModule {}
