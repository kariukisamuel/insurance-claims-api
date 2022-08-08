import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { Claims } from './entity/claims.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Claims])],
    controllers:[ClaimsController],
    providers:[ClaimsService],
})
export class ClaimsModule {}
