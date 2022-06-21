import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import ChatsEntity from '../chats.entity';
import { MessageController } from './message.controller';
import MessageEntity from './message.entity';
import MessageService from './message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule { }