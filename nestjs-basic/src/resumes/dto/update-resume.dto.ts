import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { IsArray, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import mongoose, { mongo } from 'mongoose';
import { Type } from 'class-transformer';

class UpdatedBy {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

class History {
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  updatedAt: Date;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => UpdatedBy)
  UpdatedBy: UpdatedBy;
}
export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @IsNotEmpty({ message: 'Resume history is required' })
  @IsArray({ message: 'Resume history must be an array' })
  @ValidateNested()
  @Type(() => History)
  history: History[];
}
