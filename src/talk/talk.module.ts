import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema, Talk, TalkSchema } from 'src/dto/talk/talk.schema';
import { MessageRepository, TalkRepository } from './talk.repository';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';
import { Attendee, AttendeeSchema } from 'src/dto/attendee/attendee.schema';
import { TalkGateway } from './talk.gateway';
import { AttendeesRepository } from 'src/attendee/attendee.repository';


@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Attendee.name, schema: AttendeeSchema},
        { name: Talk.name, schema: TalkSchema },
        { name: Message.name, schema: MessageSchema}

    ]),
    MongooseModule.forFeature([]),
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60000000000000000s' },
    // }),
    // ClientsModule.register([
    //   {
    //     name: 'VERIFICATION_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://admin:admin@127.0.0.1:5672'],
    //       noAck: false,
    //       queue: 'verification',
    //       queueOptions: {
    //         durable: true,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [TalkController],
  providers: [TalkRepository, TalkService, TalkGateway, MessageRepository, AttendeesRepository],
})
export class TalkModule {}
