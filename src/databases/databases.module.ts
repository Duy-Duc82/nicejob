import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { mongo } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '@app/users/schemas/user.schema';
import {
  Permission,
  PermissionSchema,
} from '@app/permissions/schemas/permission.schema';
import { Role, RoleSchema } from '@app/roles/schemas/role.schema';
import { UsersService } from '@app/users/users.service';
import { UsersModule } from '@app/users/users.module';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService, UsersService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
})
export class DatabasesModule {}
