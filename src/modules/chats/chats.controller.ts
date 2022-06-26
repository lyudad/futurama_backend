import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import ChatsEntity from './chats.entity';
import { ChatsService } from './chats.service';
import { ChatsDTO } from './chatsDTO';
import MessageEntity from './message/message.entity';
import MessageService from './message/message.service';
import MessageDTO from './message/messageDTO';


@Controller('/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post('/create')
  async create(@Body() body: ChatsDTO): Promise<void> {
    return await this.chatsService.createChat(body);
  }
}

