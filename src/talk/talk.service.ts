import { Injectable } from "@nestjs/common";
import { config } from 'dotenv';
import { SuccessResponse } from "../response/success";
import { ErrorResponse } from "../response/errors";
import { MessageRepository, TalkRepository } from "./talk.repository";
import { validateTalk } from "../validation/talk.validation";
import { AddAttendeeeToTalk, AddTalkInput } from "../dto/talk/talk.dto";
import { TalkGateway } from "./talk.gateway";
import mongoose from "mongoose";
import { validateMessage } from "../validation/message.validation";
import { AttendeesRepository } from "src/attendee/attendee.repository";


config();

@Injectable()
export class TalkService {
    constructor(
        private talkRepository: TalkRepository, 
        private talkGateway: TalkGateway, 
        private messageRepository: MessageRepository, 
        private attendeeRepository: AttendeesRepository
    ){}

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
        let id = new mongoose.Types.ObjectId(talkId)
        const talk = await this.talkRepository.findOneAndUpdate({_id:id}, {inSession: true});
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

    async addAttendee(body:AddAttendeeeToTalk){
        const talk = await this.talkRepository.findOne({_id:body.talkId})
        if(!talk){
            return ErrorResponse(
                404,
                "Talk not found",
                null,
                null
            )
        }
        // Check if attendee is registered - Returns 404 if attendee is not found
        let attendee = await this.attendeeRepository.findOne({email: body.attendeeEmail});
        if(!attendee){
            return ErrorResponse(
                404,
                "Attendee not registered",
                null,
                null
            )
        }
        


        // Check if attendee has been added to talk. Adds attendee if false
        let attendeeIndex = talk.attendees.findIndex(x => x.email == body.attendeeEmail)
        if(attendeeIndex < 0){
            talk.attendees.push(attendee._id)
            const updatedTalk = await this.talkRepository.findOneAndUpdate({_id:body.talkId}, {attendees: talk.attendees})
            return SuccessResponse(
                200,
                "Attendee added to talk successfully",
                updatedTalk,
                null
            )
        }

        return ErrorResponse(
            400,
            "Attendee already added to talk",
            null,
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
        if(!talk){
            return ErrorResponse(
                404,
                "Talk not found",
                null,
                null
            )
        }
        if(talk.inSession != true){
            return ErrorResponse(
                400,
                "Cannot send messages because talk is not in session",
                null,
                null
            )
        }

        let attendeeIndex = talk.attendees.findIndex(x => x.email == body.attendeeEmail)
        if(attendeeIndex < 0){
            return ErrorResponse(
                400,
                "Cannot send messages because attendee is not registered for this Talk",
                null,
                null
            )
        }

        const newMesssage = await this.messageRepository.create(body)

        this.talkGateway.server.emit('chat', newMesssage)

        return SuccessResponse(
            201,
            "Message sent succesfully",
            newMesssage,
            null
        )
    }
}