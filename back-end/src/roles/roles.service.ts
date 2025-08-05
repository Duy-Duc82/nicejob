import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Iuser } from '@app/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Role, roleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose, { mongo } from 'mongoose';
import { ADMIN_ROLE } from '@app/databases/example';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<roleDocument>,
  ) {}
  async create(createRoleDto: CreateRoleDto, user: Iuser) {
    const { name, description, isActive, permissions } = createRoleDto;
    const isExits = await this.roleModel.findOne({ name });
    if (isExits) {
      throw new BadRequestException('Role already exists');
    }

    const newRole = await this.roleModel.create({
      name,
      description,
      isActive,
      permissions,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return {
      id: newRole._id,
      createdAt: newRole.createdAt,
    };
  }

  async findAll(currentPage: number = 1, limit: number = 10, qs: string) {
    try {
      const { filter, sort, population, projection } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      const offset = (+currentPage - 1) * +limit;
      const defaultLimit = +limit ? +limit : 10;

      const totalItems = await this.roleModel.find(filter).countDocuments();
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.roleModel
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
      throw new Error(`Failed to fetch role: ${err.message}`);
    }
  }
  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return await this.roleModel
      .findById(id)
      .populate({
        path: 'permissions',
        select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 },
      })
      .exec();
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: Iuser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    const { name, description, isActive, permissions } = updateRoleDto;
    // const isExits = await this.roleModel.findOne({ name });
    // if (isExits) {
    //   throw new BadRequestException('Role already exists');
    // }
    const updated = await this.roleModel.updateOne(
      { _id: id },
      {
        name,
        description,
        isActive,
        permissions,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return updated;
  }

  async remove(id: string, user: Iuser) {
    const foundRole = await this.roleModel.findById(id);
    if (foundRole.name === ADMIN_ROLE) {
      throw new BadRequestException('Cannot delete admin role');
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    await this.roleModel.findOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    return this.roleModel.softDelete({ _id: id });
  }
}
