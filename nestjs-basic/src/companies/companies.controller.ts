import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public, ResponseMessage, User } from '../decorator/customize';
import { Iuser } from 'src/users/users.interface';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Companies')
@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Post()
  @ResponseMessage('Created a new company')
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: Iuser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get()
  @ResponseMessage('Fetching all companies with pagination')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') pageLimit: string,
    @Query() qs: string,
  ) {
    return this.companiesService.findAll(+currentPage, +pageLimit, qs);
  }

  @Get(':id')
  @ResponseMessage('Get company by id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update company info')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: Iuser,
  ) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete company by id')
  remove(@Param('id') id: string, @User() user: Iuser) {
    return this.companiesService.remove(id, user);
  }
}
