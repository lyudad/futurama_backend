import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import MessageEntity from './message.entity';
import MessageDTO from './messageDTO';

@Injectable()
export default class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
    ) { }

    async createMessage(newMessage: MessageDTO): Promise<MessageEntity> {
        try {
            await this.messageRepository
                .createQueryBuilder()
                .insert()
                .values({ ...newMessage })
                .execute();
            return await this.getLastMessage();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }


    async getMessagesByChatId(chatId: number): Promise<MessageEntity[]> {
        try {
            const message = await this.messageRepository
                .createQueryBuilder('message')
                .where('chatId = :chatId', { chatId })
                .leftJoin('message.author', 'users')
                .addSelect(['users.id', 'users.firstName', 'users.lastName', 'users.photo'])
                .getMany();
            return message;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async getLastMessage(): Promise<MessageEntity> {
        try {
            const message = await this.messageRepository
                .createQueryBuilder('message')
                .select(['message'])
                .leftJoin('message.author', 'users')
                .addSelect(['users.id', 'users.firstName', 'users.lastName', 'users.photo'])
                .orderBy('createdAt', 'DESC')
                .getOne();
            return message;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
