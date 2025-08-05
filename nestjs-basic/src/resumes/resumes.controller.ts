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
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Public, ResponseMessage, User } from '@app/decorator/customize';
import { Iuser } from '@app/users/users.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @ResponseMessage('Created a new resume')
  create(@Body() CreateUserCvDto: CreateUserCvDto, @User() user: Iuser) {
    return this.resumesService.create(CreateUserCvDto, user);
  }

  @Post('by-user')
  @ResponseMessage('Get resume by user')
  createByUser(@User() user: Iuser) {
    return this.resumesService.findByUsers(user);
  }

  @Get()
  @ResponseMessage('Fetching all resumes with pagination')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') pageLimit: string,
    @Query() qs: string,
  ) {
    return this.resumesService.findAll(+currentPage, +pageLimit, qs);
  }

  @Get(':id')
  @ResponseMessage('Get resume by id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update resume status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @User() user: Iuser,
  ) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete resume by id')
  remove(@Param('id') id: string, @User() user: Iuser) {
    return this.resumesService.remove(id, user);
  }
}
