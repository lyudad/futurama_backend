import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsEntity } from './contracts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractsEntity])],
  providers: [ContractsService],
  controllers: [ContractsController]
})
export class ContractsModule {}
