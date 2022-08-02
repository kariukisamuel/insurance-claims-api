import { Query } from "@nestjs/common";
import { ApiProperty,ApiQuery, } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";
import { UserRole } from "./models/role.enum";

export class CreateUserRegistrationDto{
  @ApiProperty({enum:UserRole, enumName:'BusinessRole'})
  @IsString()
  business_role: UserRole;
  @ApiProperty()
  @IsString()
  business_name:string;
  @ApiProperty()
  @IsString()
  business_phone_number: string;
  @ApiProperty()
  @IsEmail()
  business_email: string;
  @ApiProperty()
  @IsString()
  business_location:string;
  @ApiProperty()
  @IsString()
  ira_license_no: string;
  @ApiProperty()
  @IsString()
  business_registration_no: string;
  @ApiProperty()
  @IsString()
  business_registration_hard_copy: string;
  @ApiProperty()
  @IsBoolean()
  terms_and_conditions: boolean;
  @ApiProperty()
  @IsBoolean()
  user_status: boolean;
}