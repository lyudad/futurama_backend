import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsController } from './chats.controller';
import ChatsEntity from './chats.entity';
import { ChatsService } from './chats.service';
import MessageEntity from './message/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatsEntity, MessageEntity]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule { }