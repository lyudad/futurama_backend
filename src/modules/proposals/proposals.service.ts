import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';
import { ProposalsEntity } from './proposals.entity';
import { ProposalsDTO } from './proposalsDTO';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectRepository(ProposalsEntity)
    private readonly proposalsRepository: Repository<ProposalsEntity>,
    @InjectRepository(VacanciesEntity)
    private readonly vacanciesRepository: Repository<VacanciesEntity>,
  ) { }

  async createProposal(proposal: ProposalsDTO): Promise<ProposalsEntity> {
    try {
      await this.proposalsRepository
        .createQueryBuilder()
        .insert()
        .values(proposal)
        .execute();
      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }
  async getProposalsByVacancyId(id: number): Promise<object> {
    const vacancy = await this.proposalsRepository
      .createQueryBuilder('proposals')
      .where('vacancyIdId = :id', { id })
      .leftJoinAndSelect('proposals.userId', 'users')
      .getMany();
    return vacancy;
  }
}