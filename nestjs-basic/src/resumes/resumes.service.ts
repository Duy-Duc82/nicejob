import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Iuser } from '@app/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private resumeModel: SoftDeleteModel<ResumeDocument>,
  ) {}
  async create(CreateUserCvDto: CreateUserCvDto, user: Iuser) {
    const { url, companyId, jobId } = CreateUserCvDto;
    const { email, _id } = user;

    const newCV = await this.resumeModel.create({
      url,
      companyId,
      email,
      jobId,
      userId: _id,
      status: 'PENDING',
      createdBy: {
        _id,
        email,
      },
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          UpdatedBy: {
            _id,
            email,
          },
        },
      ],
    });

    return {
      _id: newCV?._id,
      createdAt: newCV?.createdAt,
    };
  }

  async findAll(currentPage: number = 1, limit: number = 10, qs: string) {
    try {
      const { filter, sort, population, projection } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      const offset = (+currentPage - 1) * +limit;
      const defaultLimit = +limit ? +limit : 10;

      const totalItems = await this.resumeModel.find(filter).countDocuments();
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.resumeModel
        .find(filter)
        .skip(offset)
        .limit(defaultLimit)
        .sort(sort as any)
        .populate(population)
        .select(projection as any)
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
      throw new Error(`Failed to fetch resume: ${err.message}`);
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid job ID: ${id}`);
    }

    try {
      const Job = await this.resumeModel.findById({ _id: id }).exec();

      if (!Job) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }

      return Job;
    } catch (err) {
      throw new Error(`Failed to fetch Job by ID: ${err.message}`);
    }
  }

  async update(id: string, status: string, user: Iuser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid resume ID: ${id}`);
    }
    const resume = await this.resumeModel.updateOne(
      { _id: id },
      {
        status,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
        $push: {
          history: {
            status: status,
            updatedAt: new Date(),
            UpdatedBy: {
              _id: user._id,
              email: user.email,
            },
          },
        },
      },
    );
    return resume;
  }

  async remove(id: string, user: Iuser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid resume ID: ${id}`);
    }
    await this.resumeModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.resumeModel.softDelete({ _id: id });
  }
  async findByUsers(user: Iuser) {
    return await this.resumeModel
      .find({ userId: user._id })
      .sort('-createdAt')
      .populate([
        {
          path: 'companyId',
          select: { name: 1 },
        },
        {
          path: 'jobId',
          select: { name: 1 },
        },
      ]);
  }
}
