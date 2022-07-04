import {
  Body,
  Controller,
  Get,
  Post,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { ChatsService } from './chats.service';
import { ChatsDTO } from './chatsDTO';

@Controller('/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post('/create')
  async create(@Body() body: ChatsDTO): Promise<void> {
    return await this.chatsService.createChat(body);
  }

  @Get('/mychats')
  async getMyChats(@Req() req: Request): Promise<object> {
    return await this.chatsService.getMyChats(req);
  }
}
