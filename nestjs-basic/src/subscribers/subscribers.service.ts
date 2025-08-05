import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Iuser } from '@app/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
  ) {}
  async create(createSubscriberDto: CreateSubscriberDto, user: Iuser) {
    const { email, name, skills } = createSubscriberDto;
    const IsExist = await this.subscriberModel.findOne({ email });
    if (IsExist) {
      throw new BadRequestException(
        `Subscriber with email ${email} already exists`,
      );
    }
    let newSubscriber = await this.subscriberModel.create({
      email,
      name,
      skills,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return {
      _id: newSubscriber._id,
      createdAt: newSubscriber.createdAt,
    };
  }

  async findAll(currentPage: number = 1, limit: number = 10, qs: string) {
    try {
      const { filter, sort, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      const offset = (+currentPage - 1) * +limit;
      const defaultLimit = +limit ? +limit : 10;

      const totalItems = await this.subscriberModel
        .find(filter)
        .countDocuments();
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.subscriberModel
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
      throw new Error(`Failed to fetch job: ${err.message}`);
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid subscriber ID');
    }
    return await this.subscriberModel.findOne({ _id: id }).exec();
  }

  async update(updateSubscriberDto: UpdateSubscriberDto, user: Iuser) {
    const updated = await this.subscriberModel.updateOne(
      { email: user.email },
      {
        ...updateSubscriberDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
      { upsert: true },
    );
    return updated;
  }

  async remove(id: string, user: Iuser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid subscriber ID');
    }
    await this.subscriberModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.subscriberModel.softDelete({ _id: id });
  }

  async getSkills(user: Iuser) {
    const { email } = user;
    return await this.subscriberModel.findOne({ email }, { skills: 1 });
  }
}
