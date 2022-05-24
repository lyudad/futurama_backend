import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsDTO } from './proposalsDTO';



@Controller('/proposal')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) { }

  @Post('/send')
  async createProposal(@Body() body: ProposalsDTO): Promise<void> {
    try {
      await this.proposalsService.createProposal(body);
    } catch (error) {
      throw error;
    }
  }
}




