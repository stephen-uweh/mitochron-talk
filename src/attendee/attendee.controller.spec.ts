import { Test, TestingModule } from '@nestjs/testing';
import { Res } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from '../dto/attendee/attendee.schema';
import { Message, MessageSchema, Talk, TalkSchema } from '../dto/talk/talk.schema';
import { AttendeeController } from './attendee.controller';
import { AttendeeService } from './attendee.service';
import { AttendeesRepository } from './attendee.repository';
import { AddAttendeeInput, GetSingleAttendeeInput } from '../dto/attendee/attendee.dto';

describe('TalkController', () => {
  let attendeeController: AttendeeController;
  let attendeeService: AttendeeService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        imports: [
            MongooseModule.forRoot(process.env.DB),
            MongooseModule.forFeature([
                { name: Attendee.name, schema: AttendeeSchema},
                { name: Talk.name, schema: TalkSchema },
                { name: Message.name, schema: MessageSchema}
        
            ]),
            // MongooseModule.forFeature([])],
        ],
        controllers: [AttendeeController],
        providers: [AttendeeService, AttendeesRepository],
    }).compile();

    attendeeController = app.get<AttendeeController>(AttendeeController);
    attendeeService = app.get<AttendeeService>(AttendeeService);
  });

  it('should be defined', () => {
    expect(attendeeController).toBeDefined()
  })

  describe("Get All Attendees", () => {
    it("should return all attendees", async () => {
        const result = {responseCode: 200, status:true, message: '', data: {}, meta: {}}
        jest.spyOn(attendeeService, 'getAllAttendees').mockImplementation(async () => result)
        expect(await attendeeService.getAllAttendees()).toBe(result)
      }) 
  })

  describe("Get Single Attendee", () => {
    it("should return a single attendee", async () => {
        let id = new GetSingleAttendeeInput()
        const result = {responseCode: 200 || 404, status:true, message: '', data: {}, meta: {}}
        jest.spyOn(attendeeService, 'getSingleAttendee').mockImplementation(async () => result)
        expect(await attendeeService.getSingleAttendee(id)).toBe(result)
      }) 
  })

  describe("Get Single Attendee", () => {
    it("should return a single attendee", async () => {
        let dto = new AddAttendeeInput()
        const result = {responseCode: 200, status:true, message: '', data: {}, meta: {}}
        jest.spyOn(attendeeService, 'addAttendee').mockImplementation(async () => result)
        expect(await attendeeService.addAttendee(dto)).toBe(result)
      }) 
  })




});
