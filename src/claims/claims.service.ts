import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClaimsDTO } from './create-claims.dto';
import { Claims } from './entity/claims.entity';

@Injectable()
export class ClaimsService {
    constructor(@InjectRepository(Claims) private claimsRepository: Repository<Claims>){}
    create(createClaimsDTO:CreateClaimsDTO) {
      // return this.claimsRepository.save(createClaimsDTO)
    }
    getAll():Promise<Claims[]>{
      // console.log(await this.claimsRepository.find())
      return this.claimsRepository.find()
    }
}
 