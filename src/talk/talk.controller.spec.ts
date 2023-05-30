import { Test, TestingModule } from '@nestjs/testing';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';
import { Res } from '@nestjs/common';
import { MessageRepository, TalkRepository } from './talk.repository';
import { TalkGateway } from './talk.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from '../dto/attendee/attendee.schema';
import { Message, MessageSchema, Talk, TalkSchema } from '../dto/talk/talk.schema';
import { GetSingleTalk, AddTalkInput } from '../dto/talk/talk.dto';

describe('TalkController', () => {
  let talkController: TalkController;
  let talkService: TalkService;

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
        controllers: [TalkController],
        providers: [TalkService, TalkRepository, TalkGateway, MessageRepository],
    }).compile();

    talkController = app.get<TalkController>(TalkController);
    talkService = app.get<TalkService>(TalkService);
  });

  it('should be defined', () => {
    expect(talkController).toBeDefined()
  })

  describe("Get All Talks", () => {
    it("should return all talks", async () => {
        const result = {responseCode: 200, status:true, message: '', data: {}, meta: {}}
        jest.spyOn(talkService, 'getAllTalks').mockImplementation(async () => result)
        expect(await talkService.getAllTalks()).toBe(result)
      }) 
  })


  describe("Get Single Talk", () => {
    it("should return single talk", async () => {
        const id = new GetSingleTalk();
        const result = {responseCode: 200, status:true, message: '', data: {}, meta: {}}
        jest.spyOn(talkService, 'getSingleTalk').mockImplementation(async () => result)
        expect(await talkService.getSingleTalk(id)).toBe(result)
      }) 
  })


  describe("Create a Talk", () => {
    it("should return created talk", async () => {
        const dto = new AddTalkInput();
        const result = {responseCode: 200, status:true, message: '', data: {}, meta: {}}
        jest.spyOn(talkService, 'addTalk').mockImplementation(async () => result)
        expect(await talkService.addTalk(dto)).toBe(result)
      }) 
  })

  describe("Delete a Talk", () => {
    it("should return 200", async () => {
        const id = new GetSingleTalk();
        const result = {responseCode: 200, status:true, message: '', data: {}, meta: {}}
        jest.spyOn(talkService, 'deleteTalk').mockImplementation(async () => result)
        expect(await talkService.deleteTalk(id)).toBe(result)
      }) 
  })


});
