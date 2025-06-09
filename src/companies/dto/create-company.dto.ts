import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class UserRef {
  @IsString()
  _id: string;

  @IsString()
  email: string;
}

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'Company name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Company address is required' })
  @IsString()
  address: string;

  @IsNotEmpty({ message: 'Company description is required' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Company logo is required' })
  @IsString()
  logo: string;
}
