import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from '../decorator/customize';
import { Iuser } from './users.interface';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @Post()
  @ResponseMessage('Create a new user')
  async create(@Body() createUserDto: CreateUserDto) {
    let newUser = await this.usersService.create(createUserDto);
    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
  }
  @Get()
  @ResponseMessage('Fetching all user with pagination')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') pageLimit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +pageLimit, qs);
  }
  @Public()
  @Get(':id')
  @ResponseMessage('Get user by id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update user info')
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: Iuser) {
    let updatedUser = await this.usersService.update(updateUserDto, user);
    return updatedUser;
  }

  @Delete(':id')
  @ResponseMessage('Delete user by id')
  async remove(@Param('id') id: string, @User() user: Iuser) {
    return this.usersService.remove(id, user);
  }
}
