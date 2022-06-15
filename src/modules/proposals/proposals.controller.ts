import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { ProposalsService } from './proposals.service';
import { ProposalsDTO } from './proposalsDTO';


@Controller('/proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) { }

  @Post('/send')
  async createProposal(@Body() body: ProposalsDTO, @Req() req: Request): Promise<void> {
    await this.proposalsService.createProposal(req, body);
  }
  @Get('/myproposals')
  async getProposalsByUserId(@Req() req: Request): Promise<object> {
    return await this.proposalsService.getProposalsByUserId(req);
  }
  @Get('/check/:id')
  async checkProposalsExist(@Param('id') vacancyId: number, @Req() req: Request): Promise<boolean> {
    return await this.proposalsService.checkProposalsExist(req, vacancyId);
  }
  @Get('/myjobs')
  async getVacanciesByOwnerId(@Req() req: Request): Promise<object[]> {
    return await this.proposalsService.getVacanciesByOwnerId(req);
  }
  @Get('/:id')
  async getProposalByVacancyId(@Param('id') id: number): Promise<object> {
    return await this.proposalsService.getProposalsByVacancyId(id);
  }
}
