import { Controller, Get, Param } from '@nestjs/common';
import { UserRoleService } from './users.role.service';

@Controller()
export class UsersRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get('/role')
  fetchByRole(@Param('role') role: string) {
    return this.userRoleService.fetch(role);
  }
}
