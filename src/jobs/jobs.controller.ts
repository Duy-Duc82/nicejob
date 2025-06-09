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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from '@app/decorator/customize';
import { Iuser } from '@app/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ResponseMessage('Create a new job')
  create(@Body() createJobDto: CreateJobDto, @User() user: Iuser) {
    return this.jobsService.create(createJobDto, user);
  }
  @Public()
  @Get()
  @ResponseMessage('Fetching all job with pagination')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') pageLimit: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(+currentPage, +pageLimit, qs);
  }
  @Public()
  @Get(':id')
  @ResponseMessage('Get job by id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findById(id);
  }

  @Patch(':id')
  @ResponseMessage('Update user info')
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: Iuser,
  ) {
    let updatedUser = await this.jobsService.update(id, updateJobDto, user);
    return updatedUser;
  }

  @Delete(':id')
  @ResponseMessage('Delete job by id')
  remove(@Param('id') id: string, @User() user: Iuser) {
    return this.jobsService.remove(id, user);
  }
}
