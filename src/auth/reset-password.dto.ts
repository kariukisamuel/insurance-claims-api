import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

 export class ResetPasswordDTO{
    @ApiProperty()
    @IsEmail()
    business_email: string;
 }