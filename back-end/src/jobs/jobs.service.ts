import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Iuser } from '@app/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { JobDocument, Job as JobM } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { User } from '@app/decorator/customize';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobM.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) {}
  async create(createJobDto: CreateJobDto, user: Iuser) {
    const {
      name,
      skills,
      company,
      salary,
      quantity,
      level,
      description,
      startDate,
      endDate,
      isActive,
      location,
    } = createJobDto;

    let newJob = await this.jobModel.create({
      name,
      skills,
      company,
      salary,
      quantity,
      level,
      description,
      startDate,
      endDate,
      isActive,
      location,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return newJob;
  }

  //find all job by pagination
  async findAll(currentPage: number = 1, limit: number = 10, qs: string) {
    try {
      const { filter, sort, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      const offset = (+currentPage - 1) * +limit;
      const defaultLimit = +limit ? +limit : 10;

      const totalItems = await this.jobModel.find(filter).countDocuments();
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.jobModel
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
  //findJobById
  async findById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid job ID: ${id}`);
    }

    try {
      const Job = await this.jobModel.findById({ _id: id }).exec();

      if (!Job) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }

      return Job;
    } catch (err) {
      throw new Error(`Failed to fetch Job by ID: ${err.message}`);
    }
  }

  async update(id: string, updateJobDto: UpdateJobDto, @User() user: Iuser) {
    const updated = await this.jobModel.updateOne(
      { _id: id },
      {
        ...updateJobDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return updated;
  }

  async remove(id: string, user: Iuser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid job ID: ${id}`);
    }
    await this.jobModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.jobModel.softDelete({ _id: id });
  }
}
