import { Injectable } from '@nestjs/common';
import UsersModel from 'src/models/users';

@Injectable()
export class UserService {
  async fetchByEmail(email: string) {
    const data = await UsersModel.fetchByEmail(email);
    return data;
  }

  async destroy(id) {
    const result = await UsersModel.destroy(id);
    return result;
  }
  async update(id: number, data) {
    const result = await UsersModel.update(id, data);
    return result;
  }
  async create(data) {
    const result = await UsersModel.create(data);
    return result;
  }
}
