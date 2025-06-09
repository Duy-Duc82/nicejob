import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose, { Schema } from 'mongoose';

class company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}
export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Age is required' })
  age: number;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsMongoId({ message: 'Role must be a valid MongoDB ObjectId' })
  role: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => company)
  company: company;
}
export class RegisterUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  role: string;
}
export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'ducduy', description: 'Username of user' })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123456', description: 'Password of user' })
  readonly password: string;
}
