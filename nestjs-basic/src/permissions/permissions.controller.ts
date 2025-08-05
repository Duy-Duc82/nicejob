import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseMessage, User } from '@app/decorator/customize';
import { Iuser } from '@app/users/users.interface';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ResponseMessage('create permission')
  create(
    @Body() createPermissionDto: CreatePermissionDto,
    @User() user: Iuser,
  ) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Get()
  @ResponseMessage('Fetching all permission with pagination')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') pageLimit: string,
    @Query() qs: string,
  ) {
    return this.permissionsService.findAll(+currentPage, +pageLimit, qs);
  }

  @Get(':id')
  @ResponseMessage('Get permisson by id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }
  @Patch(':id')
  @ResponseMessage('Update permission by id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @User() user: Iuser,
  ) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete permission by id')
  remove(@Param('id') id: string, @User() user: Iuser) {
    return this.permissionsService.remove(id, user);
  }
}
