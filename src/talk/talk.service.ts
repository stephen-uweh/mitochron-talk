import { Injectable } from "@nestjs/common";
import { config } from 'dotenv';
import { SuccessResponse } from "src/response/success";
import { ErrorResponse } from "src/response/errors";
import { MessageRepository, TalkRepository } from "./talk.repository";
import { validateTalk } from "src/validation/talk.validation";
import { AddTalkInput } from "src/dto/talk/talk.dto";
import { TalkGateway } from "./talk.gateway";
import mongoose from "mongoose";
import { validateMessage } from "src/validation/message.validation";


config();

@Injectable()
export class TalkService {
    constructor(private talkRepository: TalkRepository, private talkGateway: TalkGateway, private messageRepository: MessageRepository){}

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

    async startTalk(talkId:any){
        const talk = await this.talkRepository.findOneAndUpdate({_id:talkId}, {inSession: true});
        return SuccessResponse(
            200,
            "Talk started",
            talk,
            null
        )
    }

    async endTalk(talkId:any){
        const talk = await this.talkRepository.findOneAndUpdate({_id:talkId}, {inSession: false});
        return SuccessResponse(
            200,
            "Talk ended",
            talk,
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

    async sendMessage(body: any){
        
        const { error } = validateMessage(body);
        if (error) {
        return ErrorResponse(403, error.details[0].message, null, null);
        }

        let talk = await this.talkRepository.findOne({_id:body.talkId})
        if(talk.inSession != true){
            return ErrorResponse(
                400,
                "Cannot send messages because talk is not in session",
                null,
                null
            )
        }

        let index = talk.attendees.findIndex(x => x._id == body.attendeeId)
        if(index < 0){
            return ErrorResponse(
                400,
                "Cannot send messages because attendee is not registered for this Talk",
                null,
                null
            )
        }

        const newMesssage = await this.messageRepository.create(body)

        this.talkGateway.server.emit(body.talkId, newMesssage)

        return SuccessResponse(
            201,
            "Message sent succesfully",
            newMesssage,
            null
        )
    }
}