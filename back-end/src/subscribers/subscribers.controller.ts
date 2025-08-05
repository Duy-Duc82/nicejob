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
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import {
  ResponseMessage,
  SkipCheckPermission,
  User,
} from '@app/decorator/customize';
import { Iuser } from '@app/users/users.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  @ResponseMessage('create subscriber')
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @User() user: Iuser,
  ) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Post('skills')
  @ResponseMessage(`get subscribers's skills`)
  @SkipCheckPermission()
  getUsersSkills(@User() user: Iuser) {
    return this.subscribersService.getSkills(user);
  }

  @Get()
  @ResponseMessage('Fetching all subscriber with pagination')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') pageLimit: string,
    @Query() qs: string,
  ) {
    return this.subscribersService.findAll(+currentPage, +pageLimit, qs);
  }

  @Get(':id')
  @ResponseMessage('Get subscriber by id')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
  @SkipCheckPermission()
  @ResponseMessage('Update subscriber info')
  update(
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: Iuser,
  ) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete subscriber by id')
  remove(@Param('id') id: string, @User() user: Iuser) {
    return this.subscribersService.remove(id, user);
  }
}
