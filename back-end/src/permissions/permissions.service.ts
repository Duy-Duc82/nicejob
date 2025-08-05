import { permission } from 'process';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Iuser } from '@app/users/users.interface';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto, user: Iuser) {
    const { name, apiPath, method, module } = createPermissionDto;
    const isExits = await this.permissionModel.findOne({ apiPath, method });
    if (isExits) {
      throw new BadRequestException('Permission already exists');
    }
    const newPermission = await this.permissionModel.create({
      name,
      apiPath,
      method,
      module,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return {
      id: newPermission._id,
      createdAt: newPermission.createdAt,
    };
  }

  async findAll(currentPage: number = 1, limit: number = 10, qs: string) {
    try {
      const { filter, sort, population, projection } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      const offset = (+currentPage - 1) * +limit;
      const defaultLimit = +limit ? +limit : 10;

      const totalItems = await this.permissionModel
        .find(filter)
        .countDocuments();
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.permissionModel
        .find(filter)
        .skip(offset)
        .limit(defaultLimit)
        .sort(sort as any)
        .populate(population)
        .select(projection as any)
        .exec();
      return {
        meta: {
          current: currentPage,
          pageSize: limit,
          pages: totalPages,
          total: totalItems,
        },
        result,
      };
    } catch (err) {
      throw new Error(`Failed to fetch resume: ${err.message}`);
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid permission ID: ${id}`);
    }

    try {
      const permission = await this.permissionModel
        .findById({ _id: id })
        .exec();

      if (!permission) {
        throw new NotFoundException(`permission with ID ${id} not found`);
      }

      return permission;
    } catch (err) {
      throw new Error(`Failed to fetch permisson by ID: ${err.message}`);
    }
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
    user: Iuser,
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid permission ID: ${id}`);
    }
    const { name, apiPath, method, module } = updatePermissionDto;
    const updated = await this.permissionModel.updateOne(
      { _id: id },
      {
        module,
        method,
        apiPath,
        name,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return updated;
  }

  async remove(id: string, user: Iuser) {
    await this.permissionModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.permissionModel.softDelete({ _id: id });
  }
}
