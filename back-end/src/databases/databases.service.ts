import { UsersService } from './../users/users.service';
import { ConfigService } from '@nestjs/config';
import { permission } from 'process';
import { User, UserDocument } from '@app/users/schemas/user.schema';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  Permission,
  PermissionDocument,
} from '@app/permissions/schemas/permission.schema';
import { Role, roleDocument } from '@app/roles/schemas/role.schema';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './example';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);
  constructor(
    @InjectModel(User.name)
    private UsersModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>,

    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<roleDocument>,

    private ConfigService: ConfigService,
    private UsersService: UsersService,
  ) {}
  async onModuleInit() {
    const isInit = this.ConfigService.get<string>('SHOULD_INIT');
    if (Boolean(isInit)) {
      const countUser = await this.UsersModel.count({});
      const countPermission = await this.permissionModel.count({});
      const countRole = await this.roleModel.count({});

      if (countPermission === 0) {
        await this.permissionModel.insertMany(INIT_PERMISSIONS);
      }

      if (countRole === 0) {
        const permissions = await this.permissionModel.find({}).select(' _id');
        await this.roleModel.insertMany([
          {
            name: ADMIN_ROLE,
            description: 'Admin role has full access',
            isActive: true,
            permissions: permissions,
          },
          {
            name: USER_ROLE,
            description: 'User role',
            isActive: true,
            permissions: [],
          },
        ]);
      }

      if (countUser === 0) {
        const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
        const userRole = await this.roleModel.findOne({ name: USER_ROLE });

        await this.UsersModel.insertMany([
          {
            name: 'admin',
            email: 'duongducduy825@gmail.com',
            password: await this.UsersService.hashPassword(
              this.ConfigService.get<string>('ADMIN_PASSWORD'),
            ),
            age: 20,
            gender: 'male',
            address: 'Hà Nội',
            role: adminRole?._id,
          },
          {
            name: 'user',
            email: '12345@gmail.com',
            password: await this.UsersService.hashPassword(
              this.ConfigService.get<string>('USER_PASSWORD'),
            ),
            age: 20,
            gender: 'female',
            address: 'Hà Nội',
            role: userRole?._id,
          },
          {
            name: 'duy',
            email: '54321@gmail.com',
            password: await this.UsersService.hashPassword(
              this.ConfigService.get<string>('USER_PASSWORD'),
            ),
            age: 20,
            gender: 'male',
            address: 'Hà Nội',
            role: userRole?._id,
          },
        ]);
      }
      if (countUser > 0 && countRole > 0 && countPermission > 0) {
        this.logger.log('Database is already initialized');
      }
    }
  }
}
