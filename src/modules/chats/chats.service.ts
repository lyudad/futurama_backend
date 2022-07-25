import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatsDTO } from './chatsDTO';
import ChatsEntity from './chats.entity';
import { Request } from 'express';
import { ContactsService } from '../user/contact-info/contacts.service';
import MessageEntity from './message/message.entity';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(ChatsEntity)
        private readonly chatsRepository: Repository<ChatsEntity>,
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
    ) {
    }

    async createChat(chat: ChatsDTO): Promise<void> {
        try {
            const newChat = await this.chatsRepository
                .createQueryBuilder()
                .insert()
                .values({ ...chat })
                .execute();
            this.createSystemMessage({ messageBody: 'CHAT CREATED', author: null, type: 'SystemMessage', chatId: newChat.raw.insertId });
        } catch (error) {
            throw error;
        }
    }

    async createSystemMessage(newMessage: { messageBody: string, author: null, type: string, chatId: ChatsEntity; }): Promise<void> {
        await this.messageRepository.createQueryBuilder().insert().values({ ...newMessage }).execute();
    }

    async isChatExist(freelancerId: number, vacancyId: number): Promise<boolean> {
        const chats = await this.chatsRepository
            .createQueryBuilder('chats')
            .where('freelancerId = :freelancerId', { freelancerId })
            .andWhere('vacancyId = :vacancyId', { vacancyId })
            .getCount();
        if (chats === 1) {
            return true;
        } else return false;
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
            .orderBy('chats.createdAt', 'DESC')
            .getMany();
        return chats;
    }
    async getChatDataById(chatId: number): Promise<object> {
        try {
            const chatData = await this.chatsRepository
                .createQueryBuilder('chat')
                .where('chat.id = :chatId', { chatId })
                .leftJoin('chat.vacancy', 'vacancies')
                .addSelect(['vacancies.id'])
                .leftJoin('chat.freelancer', 'users')
                .addSelect(['users.id'])
                .getOne();
            return chatData;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}