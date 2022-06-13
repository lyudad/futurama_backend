import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractsDTO } from './contracts.dto';
import { ContractsEntity } from './contracts.entity';

@Injectable()
export class ContractsService {
    constructor(
        @InjectRepository(ContractsEntity)
        private contractsRepository: Repository<ContractsEntity>,
    ) {}

    async getFreelancerContracts(id: number): Promise<ContractsEntity[]> {
        try {
            const contracts = await this.contractsRepository
            .createQueryBuilder('contracts')
            .select(['contracts', 'owner.id', 'owner.firstName', 'owner.lastName', 'owner.photo'])
            .leftJoin('contracts.owner', 'owner')
            .where('contracts.freelancer = :id', { id })
            .orderBy('contracts.start', 'DESC')
            .getMany();
            return contracts;
        } catch (error) {
            throw error;
        }
    }

    async getJobOwnerContracts(id: number): Promise<ContractsEntity[]> {
        try {
            const contracts = await this.contractsRepository
            .createQueryBuilder('contracts')
            .select(['contracts', 'owner.id', 'owner.firstName', 'owner.lastName', 'owner.photo'])
            .leftJoin('contracts.owner', 'owner')
            .where('contracts.owner = :id', { id })
            .orderBy('contracts.start', 'DESC')
            .getMany();
            return contracts;
        } catch (error) {
            throw error;
        }
    }
    
    async createContract(contract: ContractsDTO): Promise<ContractsEntity> {
        try {
          await this.contractsRepository
            .createQueryBuilder()
            .insert()
            .values(contract)
            .execute();
          throw new HttpException('Contract created successfully', HttpStatus.OK);
        } catch (error) {
          throw error;
        }
      }

    async updateContract(contract: ContractsDTO): Promise<ContractsEntity>{
        try {
            const data = this.contractsRepository.findOne({where: {id: contract.id}})            
            await this.contractsRepository.save({...data, ...contract});
            throw new HttpException('Contract saved successfully', HttpStatus.OK);
        } catch (error) {
            throw error;
        }
    }
}
