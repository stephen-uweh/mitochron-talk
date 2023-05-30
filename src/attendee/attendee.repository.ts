import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Attendee } from '../dto/attendee/attendee.schema';

@Injectable()
export class AttendeesRepository {
    constructor(@InjectModel(Attendee.name) private attendeeModel: Model<Attendee>) {}

    public async findOne(attendeeFilterQuery: any): Promise<Attendee> {
        return this.attendeeModel.findOne(attendeeFilterQuery).lean().exec();
    }

    public async find(attendeesFilterQuery: FilterQuery<Attendee>): Promise<Attendee[]> {
        return this.attendeeModel.find(attendeesFilterQuery);
    }

    public async create(attendee): Promise<Attendee> {
        const newAttendee = new this.attendeeModel(attendee);
        return newAttendee.save();
    }


    public async findOneAndDelete(attendeeFilterQuery: FilterQuery<Attendee>){
        return this.attendeeModel.findOneAndDelete(attendeeFilterQuery);
    }


}
