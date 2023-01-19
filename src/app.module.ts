import { config } from 'dotenv';
config();
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/connection';
import { AuthModule } from './modules/auth/auth.module';
import { UsersRoleModule } from './modules/users_role/users.role.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, UsersRoleModule],
})
export class AppModule {}
