import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { UserRole } from 'src/user-registration/models/role.enum';
import { Unique } from 'typeorm';

@Unique("index_name",["business_email"])
export class AuthDTO {
  @ApiProperty()
  @IsEmail()
  business_email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiHideProperty()
  reset_password_token: string | null;
  @ApiProperty()
  @IsString()
  register_token: string | null;
  @ApiProperty({ enum: UserRole, enumName: 'BusinessRole' })
  @IsString()
  business_role: UserRole | null;
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
