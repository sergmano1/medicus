import { Injectable } from '@nestjs/common';
import RoleModel from 'src/models/users-role';
@Injectable()
export class UserRoleService {
  async fetch(role: string) {
    const data = await RoleModel.fetch(role);
    return data;
  }
}
