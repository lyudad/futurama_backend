import { UserEntity } from 'src/modules/user/user.entity';
import { IsNotEmpty } from 'class-validator';
import ChatsEntity from '../chats.entity';


export default class MessageDTO {

    @IsNotEmpty()
    messageBody: string;

    @IsNotEmpty()
    author: UserEntity;

    @IsNotEmpty()
    chatId: ChatsEntity;
}