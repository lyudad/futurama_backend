import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  Patch,
  Put
} from '@nestjs/common';
import { Request } from 'express';
import { ProposalsService } from './proposals.service';
import { ProposalsDTO } from './proposalsDTO';


@Controller('/proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) { }

  @Post('/send')
  async createProposal(@Body() body: ProposalsDTO): Promise<void> {
    await this.proposalsService.createProposal(body);
  }
  @Put('/send')
  async changeStatus(@Body() body: { id: number, status: string; }): Promise<void> {
    await this.proposalsService.changeProposalStatus(body.id, body.status);
  }
  @Get('/myproposals')
  async getProposalsByUserId(@Req() req: Request): Promise<object> {
    return await this.proposalsService.getProposalsByUserId(req);
  }
  @Get('/myinvites')
  async getInvitesByUserId(@Req() req: Request): Promise<object> {
    return await this.proposalsService.getInvitesByUserId(req);
  }
  @Get('/myoffers')
  async getOffersByUserId(@Req() req: Request): Promise<object> {
    return await this.proposalsService.getOffersByUserId(req);
  }
  @Get('/check/:id')
  async checkProposalsExist(@Param('id') vacancyId: number, @Req() req: Request): Promise<boolean> {
    return await this.proposalsService.checkProposalsExist(req, vacancyId);
  }
  // @Get('/checkoffer/:id')
  // async checkOfferExist(@Param('id') vacancyId: number, @Req() req: Request): Promise<boolean> {
  //   return await this.proposalsService.checkProposalsExist(req, vacancyId);
  // }
  @Get('/myjobs')
  async getVacanciesByOwnerId(@Req() req: Request): Promise<object[]> {
    return await this.proposalsService.getVacanciesByOwnerId(req);
  }
  @Get('/:id')
  async getProposalByVacancyId(@Param('id') id: number): Promise<object> {
    return await this.proposalsService.getProposalsByVacancyId(id);
  }
}
