import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { ChatsController } from './chats.controller';
import ChatsEntity from './chats.entity';
import { ChatsService } from './chats.service';
import MessageEntity from './message/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatsEntity]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule { }