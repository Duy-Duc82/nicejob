import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class UserRef {
  @IsString()
  _id: string;

  @IsString()
  email: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsOptional()
  @Type(() => UserRef)
  updatedBy?: UserRef;
}
