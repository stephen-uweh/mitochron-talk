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

const webSocketPort = process.env.WEB_SOCKET_PORT
@WebSocketGateway(parseInt(webSocketPort), { transports: ['websocket'] })
export class TalkGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
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
}