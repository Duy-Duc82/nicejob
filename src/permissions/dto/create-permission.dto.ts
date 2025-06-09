import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'apiPath is required' })
  apiPath: string;

  @IsNotEmpty({ message: 'method is required' })
  method: string;

  @IsNotEmpty({ message: 'module is required' })
  module: string;
}
