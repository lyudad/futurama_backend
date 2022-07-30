import {
    Body,
    Controller,
    Get,
    Param,
    Post
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import MessageEntity from './message.entity';
import MessageService from './message.service';
import MessageDTO from './messageDTO';

@ApiTags('Messages')
@Controller('/messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @ApiOperation({ summary: 'Get last message' })
    @Get('/last')
    async getLastMessage(): Promise<MessageEntity> {
        return await this.messageService.getLastMessage();
    }
    @ApiOperation({ summary: 'Get messages by chat Id' })
    @Get('/:id')
    async getMessagesByChatId(@Param('id') chatId: number): Promise<MessageEntity[]> {
        return await this.messageService.getMessagesByChatId(chatId);
    }
    @ApiOperation({ summary: 'Send message' })
    @Post('/send')
    async create(@Body() body: MessageDTO): Promise<MessageEntity> {
        return await this.messageService.createMessage(body);
    }
}