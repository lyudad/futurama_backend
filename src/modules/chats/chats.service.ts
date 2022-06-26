import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatsDTO } from './chatsDTO';
import ChatsEntity from './chats.entity';

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