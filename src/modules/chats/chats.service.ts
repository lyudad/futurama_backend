import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ChatsDTO } from './chatsDTO';
import ChatsEntity from './chats.entity';
import MessageEntity from './message/message.entity';

@Injectable()
export class ChatsService {
    constructor(      
        @InjectRepository(ChatsEntity)
        private readonly chatsRepository: Repository<ChatsEntity>,
    ) {
    }

    async createChat(chat: ChatsDTO): Promise<void> {
        try {
            await this.chatsRepository
                .createQueryBuilder()
                .insert()
                .values({ ...chat })
                .execute();
        } catch (error) {
            throw error;
        }
    }
}