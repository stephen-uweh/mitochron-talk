import { Injectable } from "@nestjs/common";
import { config } from 'dotenv';
import { SuccessResponse } from "src/response/success";
import { ErrorResponse } from "src/response/errors";
import { TalkRepository } from "./talk.repository";
import { validateTalk } from "src/validation/talk.validation";
import { AddTalkInput } from "src/dto/talk/talk.dto";


config();

@Injectable()
export class TalkService {
    constructor(private talkRepository: TalkRepository){}

    async getAllTalks(){
        const talks = await this.talkRepository.find({})
        return SuccessResponse(
            200,
            "All Talks fetched successfully",
            talks,
            null
        )
    }

    async getSingleTalk(id:any){
        const talk = await this.talkRepository.findOne({_id:id})
        if(!talk){
            return ErrorResponse(
                404,
                "Talk not found",
                null,
                null
            )
        }

        return SuccessResponse(
            200,
            "Talk fetched successfully",
            talk,
            null
        )
    }

    async addTalk(body: AddTalkInput){
        const { error } = validateTalk(body);
        if (error) {
        return ErrorResponse(403, error.details[0].message, null, null);
        }

        const newTalk = await this.talkRepository.create(body)
        return SuccessResponse(
            200,
            "Talk added succesfully",
            newTalk,
            null
        )
    }

    async addAttendee(body){
        const talk = await this.talkRepository.findOne({_id:body.talkId})
        if(!talk){
            return ErrorResponse(
                404,
                "Talk not found",
                null,
                null
            )
        }
        if(!(talk.attendees.includes(body.attendeeId))){
            talk.attendees.push(body.attendeeId)
        }
        const updatedTalk = await this.talkRepository.findOneAndUpdate({_id:body.talkId}, {attendees: talk.attendees})
        return SuccessResponse(
            200,
            "Attendee added to talk successfully",
            updatedTalk,
            null
        )
    }

    async deleteTalk(id:any){
        await this.talkRepository.findOneAndDelete({_id:id});
        return SuccessResponse(
            200,
            "Talk deleted succesfully",
            null,
            null
        )
    }
}