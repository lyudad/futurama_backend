import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ChatDTO } from './chatDTO';
import ChatsEntity from './chats.entity';
import MessageEntity from './message/message.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(MessageEntity)
        private messagesRepository: Repository<MessageEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(ChatsEntity)
        private chatsRepository: Repository<ChatsEntity>,
    ) {
    }

    async create(chat: ChatDTO): Promise<ChatsEntity> {

        try {
            await this.chatsRepository
                .createQueryBuilder()
                .insert()
                .values({ ...chat })
                .execute();
            throw new HttpException('', HttpStatus.OK);
        } catch (error) {
            throw error;
        }
    }
}