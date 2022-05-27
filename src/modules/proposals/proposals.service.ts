import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { ContactsService } from '../user/contact-info/contacts.service';
import { ProposalsEntity } from './proposals.entity';
import { ProposalsDTO } from './proposalsDTO';


@Injectable()
export class ProposalsService {
  constructor(
    @InjectRepository(ProposalsEntity)
    private readonly proposalsRepository: Repository<ProposalsEntity>
  ) { }

  async createProposal(req: Request, proposal: ProposalsDTO): Promise<ProposalsEntity> {
    const id = ContactsService.extractId(req);
    try {
      await this.proposalsRepository
        .createQueryBuilder()
        .insert()
        .values({ ...proposal, user: id })
        .execute();
      throw new HttpException('Done!', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }
  async getProposalsByVacancyId(id: number): Promise<object> {
    const vacancy = await this.proposalsRepository
      .createQueryBuilder('proposals')
      .where('vacancyId = :id', { id })
      .leftJoinAndSelect('proposals.user', 'users')
      .getMany();
    return vacancy;
  }
}