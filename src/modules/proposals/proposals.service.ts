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

  async createProposal(proposal: ProposalsDTO): Promise<ProposalsEntity> {
    try {
      await this.proposalsRepository
        .createQueryBuilder()
        .insert()
        .values({ ...proposal })
        .execute();
      throw new HttpException('Done!', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }
  async changeProposalStatus(id: number, status: string): Promise<void> {
    try {
      this.proposalsRepository.update(id, { status: status });
    } catch (error) {
      throw error;
    }
  }
  async getProposalsByVacancyId(id: number): Promise<object> {
    const proposals = await this.proposalsRepository
      .createQueryBuilder('proposals')
      .where('vacancyId = :id', { id })
      .andWhere('proposals.type = :type', { type: "Proposal" })
      .andWhere('proposals.status != :status', { status: "Deleted" })
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
      .andWhere('proposals.type = :type', { type: "Proposal" })
      .andWhere('proposals.status != :status', { status: "Deleted" })
      .leftJoinAndSelect('proposals.vacancy', 'vacancies')
      .getMany();
    return proposals;
  }
  async getInvitesByUserId(req: Request): Promise<object> {
    const id = ContactsService.extractId(req);
    const invites = await this.proposalsRepository
      .createQueryBuilder('proposals')
      .where('userId = :id', { id })
      .andWhere('proposals.type = :type', { type: "Invite" })
      .andWhere('proposals.status != :status', { status: "Deleted" })
      .leftJoin('proposals.vacancy', 'vacancies')
      .addSelect(['vacancies.category', 'vacancies.id', 'vacancies.title', 'vacancies.description', 'vacancies.price'])
      .leftJoinAndSelect('vacancies.category', 'categories')
      .leftJoinAndSelect('vacancies.skills', 'skills')
      .leftJoin('vacancies.owner', 'users')
      .addSelect(['users.firstName', 'users.lastName'])
      .getMany();
    return invites;
  }
  async getOffersByUserId(req: Request): Promise<object> {
    const id = ContactsService.extractId(req);
    const proposals = await this.proposalsRepository
      .createQueryBuilder('proposals')
      .where('userId = :id', { id })
      .andWhere('proposals.type = :type', { type: "Offer" })
      .andWhere('proposals.status != :status', { status: "Deleted" })
      .leftJoinAndSelect('proposals.vacancy', 'vacancies')
      .leftJoinAndSelect('vacancies.skills', 'skills')
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
    if (proposals.length !== 0) {
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
        .orderBy('vacancy.createdAt', 'DESC')
        .getMany();
      return vacancies;
    } catch (error) {
      throw new ConflictException(error.sqlMessage);
    }
  }
}