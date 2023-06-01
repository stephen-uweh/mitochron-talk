import { Logger} from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageRepository } from './talk.repository';
import { config } from 'dotenv';


config();

const webSocketPort = process.env.WEB_SOCKET_PORT
@WebSocketGateway(parseInt(webSocketPort), { transports: ['websocket'] })
export class TalkGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(private messageRepository: MessageRepository){}
    private logger: Logger = new Logger('TalkGateway');
    

    @WebSocketServer() server: Server;

  
    afterInit(server: Server) {
      this.logger.log('Initialized');
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client Disconnected: ${client.id}`);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client Connected: ${client.id}`);
    }

    @SubscribeMessage('chat')
    async handleEvent(@MessageBody() data: string): Promise<string> {
      await this.messageRepository.create(JSON.parse(data))
      return JSON.parse(data);
    }
}