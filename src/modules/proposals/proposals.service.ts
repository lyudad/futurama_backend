import {   
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
import { ProposalsEntity } from './proposals.entity';
import { ProposalsDTO } from './proposalsDTO';
  
  @Injectable()
  export class ProposalsService  {
    constructor(
      @InjectRepository(ProposalsEntity)
      private readonly proposalsRepository: Repository<ProposalsEntity>,
      
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
}