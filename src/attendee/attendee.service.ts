import { Injectable } from "@nestjs/common";
import { config } from 'dotenv';
import { AttendeesRepository } from "./attendee.repository";
import { SuccessResponse } from "src/response/success";
import { ErrorResponse } from "src/response/errors";
import { AddAttendeeInput, GetSingleAttendeeInput } from "src/dto/attendee/attendee.dto";
import { validateAttendee } from "src/validation/attendee.validation";


config();

@Injectable()

export class AttendeeService {
    constructor(private attendeeRepository: AttendeesRepository){}

    async getAllAttendees(){
        const attendees = await this.attendeeRepository.find({})
        return SuccessResponse(
            200,
            "All Attendees fetched",
            attendees,
            null
        )
    }

    async getSingleAttendee(query:GetSingleAttendeeInput){
        const attendee = await this.attendeeRepository.findOne({ _id:query.id })
        if(!attendee){
            return ErrorResponse(
                404,
                "Attendee not found",
                null,
                null
            )
        }
        return SuccessResponse(
            200,
            "Attendee fetched successfully",
            attendee,
            null
        )
    }

    async addAttendee(body: AddAttendeeInput){
        const { error } = validateAttendee(body);
        if (error) {
        return ErrorResponse(403, error.details[0].message, null, null);
        }

        const newAttendee = await this.attendeeRepository.create(body)
        return SuccessResponse(
            201,
            "Attendee added successfully",
            newAttendee,
            null
        )
    }
}