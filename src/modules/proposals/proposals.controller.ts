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


@Controller('/proposal')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) { }

  @Post('/send')
  async createProposal(@Body() body: ProposalsDTO, @Req() req: Request): Promise<void> {
    await this.proposalsService.createProposal(req, body);
  }

  @Get('/:id')
  async getProposalByVacancyId(@Param('id') id: number): Promise<object> {
    return await this.proposalsService.getProposalsByVacancyId(id);
  }
}
