import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from 'src/dto/attendee/attendee.schema';
import { AttendeesRepository } from './attendee.repository';
import { AttendeeService } from './attendee.service';
import { AttendeeController } from './attendee.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendee.name, schema: AttendeeSchema }

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
  controllers: [AttendeeController],
  providers: [AttendeesRepository, AttendeeService],
})
export class AttendeeModule {}
