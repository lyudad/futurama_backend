import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import MessageEntity from './message/message.entity';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService
  ) {
  }

  async handleConnection(socket: Socket) {
    // await this.chatService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() messageBody: string,
   
  ) {
    //   const author = await this.chatService.getUserFromSocket(socket);

    //   const message = await this.chatService.saveMessage(messageBody, author);

    this.server.sockets.emit('receive_message', messageBody);

    // return message;
  }

  @SubscribeMessage('request_all_messages')
  async requestAllMessages(
    @ConnectedSocket() socket: Socket,
  ) {
    // await this.chatService.getUserFromSocket(socket);
    const messages = await this.chatService.getAllMessages();

    socket.emit('send_all_messages', messages);
  }
}



export default class MessageGateway
  implements OnGatewayConnection
{
  @WebSocketServer() server: Server;
 constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('msgToServer')
  async create(
    @MessageBody() createMessageDto,
  ): Promise<MessageEntity> {   
      const message = await this.messageService.create(createMessageDto);
      this.server.emit('msgToClient', message);

      return message;
   
  }

  @SubscribeMessage('findAllMessages')
  async findAll(): Promise<MessageEntity[]> {
      const allMessages = await this.messageService.findAll();
      return allMessages;
    
  }

  @SubscribeMessage('join_room')
  async messageRoom(@MessageBody() room: number): Promise<MessageEntity[]> {
    const newMessage = await this.messageService.findMessagesByRoomId(room);
    return newMessage;
  } 
}