import {
  Body,
  Controller,
  Get,
  Param,
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

  //  @Get('/:id')
  // async getMessagesByChatId(@Param('id') chatId: number): Promise<MessageEntity[]> {
  //     return await this.messageService.getMessagesByChatId(chatId);
  // }

  @Post('/create')
  async create(@Body() body: ChatsDTO): Promise<void> {
    return await this.chatsService.createChat(body);
  }
}

