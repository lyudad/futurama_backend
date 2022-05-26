import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';

import { ProposalsController } from './proposals.controller';
import { ProposalsEntity } from './proposals.entity';
import { ProposalsService } from './proposals.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, VacanciesEntity, ProposalsEntity]),
  ],
  controllers: [ProposalsController],
  providers: [ProposalsService],
})
export class ProposalsModule { }