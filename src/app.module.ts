import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendeeModule } from './attendee/attendee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from './dto/attendee/attendee.schema';
import { AttendeesRepository } from './attendee/attendee.repository';
import { AttendeeService } from './attendee/attendee.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { TalkModule } from './talk/talk.module';
import { Talk, TalkSchema } from './dto/talk/talk.schema';
import { TalkRepository } from './talk/talk.repository';

@Module({
  imports: [
    AttendeeModule,
    TalkModule,
    MongooseModule.forRoot(process.env.DB),
    MongooseModule.forFeature([
      {name: Attendee.name, schema: AttendeeSchema},
      { name: Talk.name, schema: TalkSchema}
    ]),
    PrometheusModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, AttendeesRepository, AttendeeService, TalkRepository],
})
export class AppModule {}
