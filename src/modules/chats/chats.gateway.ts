import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import MessageEntity from './message/message.entity';
import MessageService from './message/message.service';
import MessageDTO from './message/messageDTO';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('Gateway');

  constructor(private readonly messageService: MessageService) { }

  @SubscribeMessage('message')
  async create(@MessageBody() newMessage: MessageDTO): Promise<MessageEntity> {
    const message = await this.messageService.create(newMessage);
    this.server.emit('message', message);
    return message;
  }

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}