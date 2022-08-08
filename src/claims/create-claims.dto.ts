import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClaimsDTO {
  @ApiProperty({ description: 'Insurance Firm' })
  @IsString()
  insurance_firm: string;
  @ApiProperty({ description: 'Policy Type' })
  @IsString()
  policy_type: string;
  @ApiProperty({ description: 'Policy string' })
  @IsString()
  policy_no: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  policy_hard_copy_link: string;
  @ApiProperty({ description: 'Policy Period' })
  @IsInt()
  policy_period: number;
  @ApiProperty({ description: 'Premium Amount' })
  @IsInt()
  premium_amount: number;
  @ApiProperty({ description: 'Expected Commision' })
  @IsInt()
  expected_commision: number;
  @ApiProperty({ description: 'Invoice string' })
  @IsString()
  invoice_no: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  invoice_hard_copy: string;
  @ApiProperty()
  @IsInt()
  user_id: string;
  @ApiProperty()
  @IsInt()
  claim_status: string;
  @ApiPropertyOptional({ description: 'Mpesa Phone' })
  @IsString()
  mpesa_phone: string;
  @ApiPropertyOptional({ description: 'Bank Name' })
  @IsString()
  bank_name: string;
  @ApiPropertyOptional({ description: 'Bank Account No' })
  @IsString()
  bank_account_no: string;
  @ApiPropertyOptional({ description: 'Bank Branch' })
  @IsString()
  bank_branch: string;
}
