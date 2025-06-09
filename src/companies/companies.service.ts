import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Iuser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: Iuser) {
    const { name, address, description, logo } = createCompanyDto;
    let newCompany = await this.companyModel.create({
      name,
      address,
      description,
      logo,
      createdBy: {
        _id: user?._id,
        email: user?.email,
      },
    });
    return newCompany;
  }

  async findAll(currentPage: number = 1, limit: number = 10, qs: string) {
    try {
      const { filter, sort, population } = aqp(qs);
      delete filter.current;
      delete filter.pageSize;

      const offset = (+currentPage - 1) * +limit;
      const defaultLimit = +limit ? +limit : 10;

      const totalItems = await this.companyModel.find(filter).countDocuments();
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.companyModel
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
      throw new Error(`Failed to fetch companies: ${err.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const company = await this.companyModel.findById(id).exec();
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid company ID');
      }
      return company;
    } catch (err) {
      return { message: 'Company not found' };
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: Iuser) {
    try {
      const company = await this.companyModel.findById(id).exec();

      if (!company) {
        return { message: 'Company not found' };
      }

      // Cập nhật dữ liệu
      Object.assign(company, updateCompanyDto);

      if (user && user._id && user.email) {
        company.updatedBy = {
          _id: new mongoose.Types.ObjectId(user._id),
          email: user.email,
        };
      }

      // Lưu lại document
      const updatedCompany = await company.save();

      return {
        message: 'Company updated successfully',
        company: { ...updatedCompany.toObject(), updatedBy: company.updatedBy },
      };
    } catch (err) {
      throw new Error(`Failed to update company: ${err.message}`);
    }
  }

  async remove(id: string, user?: any) {
    try {
      const company = await this.companyModel.findById(id).exec();

      if (!company) {
        return { message: 'Company not found' };
      }
      // Cập nhật thông tin người xóa trước khi xóa mềm
      if (user && user._id && user.email) {
        company.deletedBy = {
          _id: new mongoose.Types.ObjectId(user._id),
          email: user.email,
        };
        await company.save(); // Lưu thông tin người xóa
      }

      const deletedCompany = await this.companyModel.softDelete({ _id: id });

      if (!deletedCompany || deletedCompany.deleted === 0) {
        return { message: 'Company not found' };
      }
      const updatedCompany = await this.companyModel.findById(id).exec();
      return {
        message: 'Company deleted successfully',
        deletedCount: deletedCompany.deleted,
        deletedCompany: updatedCompany,
      };
    } catch (err) {
      throw new Error(`Failed to delete company: ${err.message}`);
    }
  }
}
