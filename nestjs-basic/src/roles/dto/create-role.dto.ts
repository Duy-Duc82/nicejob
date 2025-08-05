import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @IsNotEmpty({ message: 'isActive is required' })
  isActive: boolean;

  @IsNotEmpty({ message: 'permission is required' })
  @IsMongoId({ each: true, message: 'permission must be a valid ObjectId' })
  @IsArray({ message: 'permission must be an array' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
