import { HttpStatus, Injectable } from '@nestjs/common';
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

    async create(message: MessageDTO): Promise<MessageEntity> {
        try {
            await this.messageRepository
                .createQueryBuilder()
                .insert()
                .values({ ...message })
                .execute();
            throw HttpStatus.OK;
        } catch (error) {
            throw error;
        }
    }

    async getMessagesByChatId(chatId: number): Promise<MessageEntity[]> {
        try {
            const message = await this.messageRepository
                .createQueryBuilder('message')
                .where('chatId = :chatId', { chatId })
                .leftJoinAndSelect('message.author', 'user')
                .getMany();

            return message;
        } catch (error) {
            throw error;
        }
    }
}