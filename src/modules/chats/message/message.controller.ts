import {
    Body,
    Controller,
    Get,
    Param,
    Post
} from '@nestjs/common';
import MessageEntity from './message.entity';
import MessageService from './message.service';
import MessageDTO from './messageDTO';

@Controller('/messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Get('/last')
    async getLastMessage(): Promise<MessageEntity> {
        return await this.messageService.getLastMessage()
    }

    @Get('/:id')
    async getMessagesByChatId(@Param('id') chatId: number): Promise<MessageEntity[]> {
        return await this.messageService.getMessagesByChatId(chatId);
    }

    @Post('/send')
    async create(@Body() body: MessageDTO): Promise<MessageEntity> {
        return await this.messageService.createMessage(body);
    } 
}