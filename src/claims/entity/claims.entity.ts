import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Claims {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  insurance_firm: string;
  @Column()
  policy_type: string;
  @Column()
  policy_no: string;
  @Column()
  policy_hard_copy_link: string;
  @Column()
  policy_period: number;
  @Column()
  premium_amount: number;
  @Column()
  expected_commision: number;
  @Column()
  invoice_no: string;
  @Column()
  invoice_hard_copy: string;
  @Column()
  user_id: number;
  @Column()
  claim_status: number;
  @Column()
  mpesa_phone: string;
  @Column()
  bank_name: string;
  @Column()
  bank_account_no: string;
  @Column()
  bank_branch: string;
}
