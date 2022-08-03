import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRegistrationDto } from './create-user-registration.dto';
import { UserRegistration } from './entity/user-registration.entity';

@Injectable()
export class UserRegistrationService {
  constructor(
    @InjectRepository(UserRegistration)
    private userRegistrationRepository: Repository<UserRegistration>,
  ) {}
  get(): Promise<UserRegistration[]> {
    return this.userRegistrationRepository.find()
  }
  create(CreateUserRegistrationDto:CreateUserRegistrationDto) {
    return this.userRegistrationRepository.save(CreateUserRegistrationDto);
  }
  getUser(id:number){
    return this.userRegistrationRepository.findOne({where:{id}})
  }


}
