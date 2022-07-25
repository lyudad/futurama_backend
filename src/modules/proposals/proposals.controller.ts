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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ProposalsService } from './proposals.service';
import { ProposalsDTO } from './proposalsDTO';

@ApiTags('Proposals and invites')
@Controller('/proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) { }

  @ApiOperation({ summary: 'Send proposal/invite' })
  @Post('/send')
  async createProposal(@Body() body: ProposalsDTO): Promise<void> {
    await this.proposalsService.createProposal(body);
  }
  @ApiOperation({ summary: 'Change status of proposal/invite' })
  @Put('/send')
  async changeStatus(@Body() body: { id: number, status: string; }): Promise<void> {
    await this.proposalsService.changeProposalStatus(body.id, body.status);
  }
  @ApiOperation({ summary: 'Get proposals by userId from token' })
  @Get('/myproposals')
  async getProposalsByUserId(@Req() req: Request): Promise<object> {
    return await this.proposalsService.getProposalsByUserId(req);
  }
  @ApiOperation({ summary: 'Get invites by userId from token' })
  @Get('/myinvites')
  async getInvitesByUserId(@Req() req: Request): Promise<object> {
    return await this.proposalsService.getInvitesByUserId(req);
  }
  @ApiOperation({ summary: 'Get offers by userId from token' })
  @Get('/myoffers')
  async getOffersByUserId(@Req() req: Request): Promise<object> {
    return await this.proposalsService.getOffersByUserId(req);
  }
  @ApiOperation({ summary: 'Check proposals is exist' })
  @Get('/check/:id')
  async checkProposalsExist(@Param('id') vacancyId: number, @Req() req: Request): Promise<boolean> {
    return await this.proposalsService.checkProposalsExist(req, vacancyId);
  }
  @ApiOperation({ summary: 'Get jobs with proposals by userId from token' })
  @Get('/myjobs')
  async getVacanciesByOwnerId(@Req() req: Request): Promise<object[]> {
    return await this.proposalsService.getVacanciesByOwnerId(req);
  }
  @ApiOperation({ summary: 'Get jobs with proposals by userId from token' })
  @Get('/myjobs/:id')
  async getVacanciesForCurrentUser(@Req() req: Request, @Param('id') userId: number,): Promise<object[]> {
    return await this.proposalsService.getVacanciesForUser(req, userId);
  }
  @ApiOperation({ summary: 'Get proposals by vacancyId' })
  @Get('/:id')
  async getProposalByVacancyId(@Param('id') id: number): Promise<object> {
    return await this.proposalsService.getProposalsByVacancyId(id);
  }
  @ApiOperation({ summary: 'Check offer exist' })
  @Post('/offer-exist')
  async isOfferExist(@Body() body: { vacancyId: number, freelancerId: number; }): Promise<boolean> {
    return await this.proposalsService.isOfferExist(body.vacancyId, body.freelancerId);
  }
}
