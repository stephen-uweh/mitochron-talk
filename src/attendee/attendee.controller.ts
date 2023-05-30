import { Controller, Get, Res, Body, Post, Query, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AttendeeService } from './attendee.service';
import { AddAttendeeInput, GetSingleAttendeeInput } from '../dto/attendee/attendee.dto';

@ApiTags('Attendees')
@Controller('attendees')
export class AttendeeController {
    constructor(private attendeeService: AttendeeService){}

    @Get()
    async getAllAttendees(@Res() res){
        const response = await this.attendeeService.getAllAttendees()
        return res.status(response.responseCode).send(response)
    }

    @Get('/single')
    async getSingleAttendee(@Res() res, @Query() query: GetSingleAttendeeInput){
        const response = await this.attendeeService.getSingleAttendee(query)
        return res.status(response.responseCode).send(response)
    }

    @Post('/add')
    async addAttendee(@Res() res, @Body() body: AddAttendeeInput){
        const response = await this.attendeeService.addAttendee(body)
        return res.status(response.responseCode).send(response)
    }
}