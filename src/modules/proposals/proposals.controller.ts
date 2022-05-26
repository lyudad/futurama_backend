import {
  Controller,
  Post,
  Body,
  Get,
  Param
} from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsDTO } from './proposalsDTO';


@Controller('/proposal')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) { }

  @Post('/send')
  async createProposal(@Body() body: ProposalsDTO): Promise<void> {
    await this.proposalsService.createProposal(body);
  }

  @Get('/:id')
  async getProposalByVacancyId(@Param('id') id: number): Promise<object> {
    return await this.proposalsService.getProposalsByVacancyId(id);
  }
}
