import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDTO{
    @ApiProperty()
    @IsEmail()
    business_email: string;
    @ApiProperty()
    @IsString()
    password: string;
}