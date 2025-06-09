import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  logo: string;
}
export class CreateJobDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'skills is required' })
  @IsArray({ message: 'skills must be an array' })
  @IsString({ each: true, message: 'skills must be an array of strings' })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => company)
  company: company;

  @IsNotEmpty({ message: 'salary is required' })
  salary: number;

  @IsNotEmpty({ message: 'quantity is required' })
  quantity: string;

  @IsNotEmpty({ message: 'level is required' })
  level: string;

  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @IsNotEmpty({ message: 'location is required' })
  @IsString({ message: 'location must be a string' })
  location: string;

  @IsNotEmpty({ message: 'startDate is required' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'startDate must be a valid date' })
  startDate: Date;

  @IsNotEmpty({ message: 'endDate is required' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'endDate must be a valid date' })
  endDate: Date;

  @IsNotEmpty({ message: 'isActive is required' })
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive: boolean;
}
