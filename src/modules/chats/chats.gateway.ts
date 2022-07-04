import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import MessageService from './message/message.service';
import MessageEntity from './message/message.entity';
import MessageDTO from './message/messageDTO';



@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export default class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('send_message')
  async create(
    @MessageBody() newMessage: MessageDTO,
  ): Promise<MessageEntity> {
    try {
      const message = await this.messageService.createMessage(newMessage);
      this.server.emit('receive_message', message);

      return message;
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  afterInit(): void {
    this.logger.log(`Initialized...`);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
