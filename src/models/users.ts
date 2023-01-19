import { Model, PartialModelGraph } from 'objection';
import { UsersInterface } from 'src/interfaces/Users';
import RoleModel from './users-role';

interface UsersModel extends UsersInterface {}

class UsersModel extends Model {
  static tableName = 'users';

  static relationMappings = {
    roles: {
      relation: Model.HasOneRelation,
      modelClass: RoleModel,
      join: {
        from: 'users.role',
        to: 'users_role.id',
      },
    },
  };
  static fetchByEmail(email: string) {
    return this.query()
      .select('*')
      .where('email', email)
      .first()
      .withGraphJoined('roles');
  }
  static fetchById(id: number) {
    return this.query().findById(id);
  }

  static destroy(id: string) {
    return this.query().delete().where('id', id);
  }

  static update(id: number, data: Partial<UsersInterface>) {
    return this.query().patchAndFetchById(id, data);
  }
  static create(data: PartialModelGraph<Omit<UsersInterface, 'id'>>) {
    return this.query().insertGraph(data).returning(['id', 'email']);
  }
  // static fetchByRoleName(name: string) {
  //   return this.query()
  //     .select('*')
  //     .modifiers({
  //       role(builder) {
  //         builder.where('role', name);
  //       },
  //     });
  // }
  // static fetchByEmailAndRole(email: string, role: number | string) {
  //   return this.query()
  //     .modify('user')
  //     .where('email', email)
  //     .where((builder) => {
  //       if (role) {
  //         builder.where('role', role);
  //       }
  //     })
  //     .first();
  // }

  // static fetchByRole(_role: string, page: number, limit: number, name: string) {
  //   return this.query().page(page, limit);
  // }
  // static fetchByName(name: string) {
  //   return this.query().select('id').modify('search', name);
  // }
  // static fetchByKey(key: string) {
  //   return this.query().modify('user').where('confirm', key).first();
  // }
  // static fetchById(
  //   id: number | string,
  //   _notVerified?: boolean,
  //   _permission?: number,
  // ) {
  //   return this.query().select('*').findById(id);
  // }
  // static fetchUserNotPasswordIByd(id: number | string) {
  //   return this.query().modify('user').findById(id).whereNot('removed', 1);
  // }
  static get modelPaths() {
    return [__dirname];
  }
}
export default UsersModel;
