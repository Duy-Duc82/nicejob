import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage, User } from '@app/decorator/customize';
import { Iuser } from '@app/users/users.interface';
import { response } from 'express';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ResponseMessage('Create a new role')
  create(@Body() createRoleDto: CreateRoleDto, @User() user: Iuser) {
    return this.roleService.create(createRoleDto, user);
  }

  @Get()
  @ResponseMessage('Fetching all role with pagination')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') pageLimit: string,
    @Query() qs: string,
  ) {
    return this.roleService.findAll(+currentPage, +pageLimit, qs);
  }

  @Get(':id')
  @ResponseMessage('Get role by id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update role by id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @User() user: Iuser,
  ) {
    return this.roleService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete role by id')
  remove(@Param('id') id: string, @User() user: Iuser) {
    return this.roleService.remove(id, user);
  }
}
