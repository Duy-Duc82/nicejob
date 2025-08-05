import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserM, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Iuser } from './users.interface';
import mongoose from 'mongoose';
import { User } from 'src/decorator/customize';
import aqp from 'api-query-params';
import { Role, roleDocument } from '@app/roles/schemas/role.schema';
import { USER_ROLE } from '@app/databases/example';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserM.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<roleDocument>,

    private ConfigService: ConfigService,
  ) {}
  //hashPassword
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  //comparePassword
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
  //createUser
  async create(createUserDto: CreateUserDto) {
    const { name, email, password, age, address, role, company } =
      createUserDto;
    const isExistedEmail = await this.userModel.findOne({ email });
    if (isExistedEmail) {
      throw new BadRequestException(`email ${email} already exists`);
    }
    const hashedPassword = await this.hashPassword(password);
    let newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      age,
      address,
      role,
      company,
    });
    return newUser;
  }
  //find all user by pagination
  async findAll(currentPage: number = 1, limit: number = 10, qs: string) {
    try {
      const { filter, sort, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      const offset = (+currentPage - 1) * +limit;
      const defaultLimit = +limit ? +limit : 10;

      const totalItems = await this.userModel.find(filter).countDocuments();
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.userModel
        .find(filter)
        .skip(offset)
        .limit(defaultLimit)
        .sort(sort as any)
        .populate(population)
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
      throw new Error(`Failed to fetch user: ${err.message}`);
    }
  }
  //findUserById
  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid user ID: ${id}`);
    }

    try {
      const user = await this.userModel
        .findOne({ _id: id })
        .select('-password')
        .populate({ path: 'role', select: { name: 1, _id: 1 } })
        .exec();

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (err) {
      throw new Error(`Failed to fetch user by ID: ${err.message}`);
    }
  }
  //findUserByEmail(username)
  async findByUsername(email: string) {
    try {
      const user = await this.userModel
        .findOne({ email })
        .populate({ path: 'role', select: { name: 1 } })
        .exec();
      return user || null;
    } catch (err) {
      throw new Error(`Failed to fetch user by email: ${err.message}`);
    }
  }
  //updateUser
  async update(updateUserDto: UpdateUserDto, @User() user: Iuser) {
    const updated = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return updated;
  }
  //deleteUser
  async remove(id: string, user: Iuser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid user id: ${id},not found user`);
    }
    const foundUser = await this.userModel.findById(id);
    if (
      foundUser &&
      foundUser.email.toString() ===
        this.ConfigService.get<string>('ADMIN_EMAIL')
    ) {
      throw new BadRequestException(`You can't delete this user(admin)`);
    }
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.userModel.softDelete({ _id: id });
  }
  //registerUser
  async register(user: RegisterUserDto) {
    const { name, email, password, age, address, role } = user;
    const isExistedEmail = await this.userModel.findOne({ email });
    if (isExistedEmail) {
      throw new BadRequestException(`email ${email} already exists`);
    }
    const userRole = await this.roleModel.findOne({ name: USER_ROLE });
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      age,
      address,
      role: userRole?._id,
    });
    return newUser;
  }

  updateRefreshToken = async (refreshToken: string, _id: string) => {
    await this.userModel.updateOne({ _id }, { refreshToken });
  };
  findUserByRefreshToken = async (refreshToken: string) => {
    return await this.userModel
      .findOne({ refreshToken })
      .populate({ path: 'role', select: { name: 1 } });
  };
}
