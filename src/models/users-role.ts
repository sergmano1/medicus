import { Model } from 'objection';
import { UsersRoleInterface } from 'src/interfaces/users-role';

interface RoleModel extends UsersRoleInterface {}

class RoleModel extends Model {
  static tableName = 'users_role';
  // Fetch All Role //
  static fetch(_role: string) {
    return this.query().select('*');
  }
  static get modelPaths() {
    return [__dirname];
  }
}

export default RoleModel;
