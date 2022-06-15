import {
  ConflictException,
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
import { VacanciesEntity } from '../vacancies/entities/vacancies.entity';


@Injectable()
export class ProposalsService {
  constructor(
    @InjectRepository(ProposalsEntity)
    private readonly proposalsRepository: Repository<ProposalsEntity>,
    @InjectRepository(VacanciesEntity)
    private readonly vacanciesRepository: Repository<VacanciesEntity>
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
    const proposals = await this.proposalsRepository
      .createQueryBuilder('proposals')
      .where('vacancyId = :id', { id })
      .leftJoinAndSelect('proposals.user', 'users')
      .leftJoinAndSelect('proposals.vacancy', 'vacancy')
      .getMany();
    return proposals;
  }
  async getProposalsByUserId(req: Request): Promise<object> {
    const id = ContactsService.extractId(req);
    const proposals = await this.proposalsRepository
      .createQueryBuilder('proposals')
      .where('userId = :id', { id })
      .leftJoinAndSelect('proposals.vacancy', 'vacancies')
      .getMany();
    return proposals;
  }
  async checkProposalsExist(req: Request, vacancyId: number): Promise<boolean> {
    const userId = ContactsService.extractId(req);
    const proposals = await this.proposalsRepository
      .createQueryBuilder('proposals')
      .where('userId = :userId', { userId })
      .andWhere('vacancyId = :vacancyId', { vacancyId })
      .getMany();
    if (proposals.length === 1) {
      return true;
    } else return false;
  }

  async getVacanciesByOwnerId(req: Request): Promise<object[]> {
    const ownerId = ContactsService.extractId(req);
    try {
      const vacancies = await this.vacanciesRepository
        .createQueryBuilder('vacancy')
        .where('ownerId = :ownerId', { ownerId })
        .leftJoinAndSelect('vacancy.skills', 'skills')
        .leftJoinAndSelect('vacancy.proposals', 'proposals')
        .leftJoin('proposals.user', 'users')
        .addSelect(['users.id', 'users.firstName', 'users.lastName', 'users.phone', 'users.photo'])
        .getMany();
      return vacancies;
    } catch (error) {
      throw new ConflictException(error.sqlMessage);
    }
  }
}