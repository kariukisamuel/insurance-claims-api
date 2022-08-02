import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class UserRegistration{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  business_role: string;
  @Column()
  business_name:string;
  @Column()
  business_phone_number: string;
  @Column({ type: "varchar", length: 200, unique: true })
  business_email: string;
  @Column()
  business_location:string;
  @Column()
  ira_license_no: string;
  @Column()
  business_registration_no: string;
  @Column()
  business_registration_hard_copy: string;
  @Column()
  terms_and_conditions: boolean;
  @Column()
  user_status: boolean;
}