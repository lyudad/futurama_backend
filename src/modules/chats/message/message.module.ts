import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  ChatsGateway  from '../chats.gateway';
import { MessageController } from './message.controller';
import MessageEntity from './message.entity';
import MessageService from './message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
  ],
  controllers: [MessageController],
  providers: [MessageService, ChatsGateway],
})
export class MessageModule { }