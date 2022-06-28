import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatsDTO } from './chatsDTO';
import ChatsEntity from './chats.entity';
import { Request } from 'express';
import { ContactsService } from '../user/contact-info/contacts.service';

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

    async getMyChats(req: Request): Promise<object> {
        const id = ContactsService.extractId(req);
        const chats = await this.chatsRepository
            .createQueryBuilder('chats')
            .where('freelancerId = :id', { id })
            .leftJoin('chats.freelancer', 'user')
            .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.photo'])
            .leftJoin('chats.vacancy', 'vacancies')
            .addSelect(['vacancies.id', 'vacancies.title', 'vacancies.description', 'vacancies.englishLevel', 'vacancies.price', 'vacancies.timePerWeek'])
            .leftJoin('vacancies.owner', 'users')
            .addSelect(['users.id', 'users.firstName', 'users.lastName', 'users.photo'])
            .orWhere('vacancies.owner = :id', { id })            
            .getMany();
        return chats;
    }
}