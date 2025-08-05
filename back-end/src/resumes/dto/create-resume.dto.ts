import {
  IsEmail,
  IsOptional,
  IsString,
  IsArray,
  IsObject,
  IsNotEmpty,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

export class CreateResumeDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Resume name is required' })
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Resume name is required' })
  url: string;

  @IsNotEmpty({ message: 'Resume status is required' })
  @IsString()
  status: string;

  @IsNotEmpty({ message: 'Resume companyId is required' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Resume JobId is required' })
  jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
  @IsNotEmpty({ message: 'Resume name is required' })
  url: string;

  @IsNotEmpty({ message: 'Resume companyId is required' })
  @IsMongoId({ message: 'companyId must be a valid ObjectId' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Resume JobId is required' })
  @IsMongoId({ message: 'JobId must be a valid ObjectId' })
  jobId: mongoose.Schema.Types.ObjectId;
}
