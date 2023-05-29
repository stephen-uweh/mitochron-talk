import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Message, Talk } from 'src/dto/talk/talk.schema';

@Injectable()
export class TalkRepository {
    constructor(@InjectModel(Talk.name) private talkModel: Model<Talk>) {}

    public async findOne(talkFilterQuery: any): Promise<Talk> {
        return this.talkModel.findOne(talkFilterQuery).lean().populate('attendees').exec();
    }

    public async find(talkFilterQuery: FilterQuery<Talk>): Promise<Talk[]> {
        return this.talkModel.find(talkFilterQuery);
    }

    public async create(talk): Promise<Talk> {
        const newTalk = new this.talkModel(talk);
        return newTalk.save();
    }

    public async findOneAndUpdate(
        talkFilterQuery: FilterQuery<Talk>,
        talk: Partial<Talk>,
    ): Promise<Talk> {
        return this.talkModel.findOneAndUpdate(talkFilterQuery, talk, {
          new: true,
        }).exec();
    }


    public async findOneAndDelete(talkFilterQuery: FilterQuery<Talk>){
        return this.talkModel.findOneAndDelete(talkFilterQuery).exec();
    }


}


export class MessageRepository {
    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

    public async create(message): Promise <Message>{
        const newTalk = new this.messageModel(message)
        return newTalk;
    }
}