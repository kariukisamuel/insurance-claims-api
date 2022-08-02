import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth{
   @PrimaryGeneratedColumn()
   id:number;
   @Column({ type: "varchar", length: 200, unique: true })
   business_email:string;
   @Column({ nullable: true })
   password: string;
   @Column({ nullable: true })
   reset_password_token: string;
   @Column({ nullable: true })
   register_token: string;
   @Column()
   business_role: string;
   @Column()
   status: boolean;
}