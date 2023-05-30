import { Controller, Get, Res, Body, Post, Query, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TalkService } from './talk.service';
import { AddAttendeeeToTalk, AddTalkInput, GetSingleTalk, SendMessage } from '../dto/talk/talk.dto';
import { query } from 'express';


@ApiTags('Talk')
@Controller('talk')

export class TalkController {
    constructor(private talkService: TalkService){}

    @Get('')
    async getAllTalks(@Res() res){
        const response = await this.talkService.getAllTalks()
        return res.status(response.responseCode).send(response)
    }

    @Get('/single')
    async getSingleTalk(@Res() res, @Query() query:GetSingleTalk){
        const response = await this.talkService.getSingleTalk(query.id)
        return res.status(response.responseCode).send(response)
    }

    @Post('/add')
    async addTalk(@Res() res, @Body() body:AddTalkInput){
        const response = await this.talkService.addTalk(body)
        return res.status(response.responseCode).send(response)
    }

    @Get('start')
    async startTalk(@Res() res, @Query() query:GetSingleTalk){
        const response = await this.talkService.startTalk(query.id)
        return res.status(response.responseCode).send(response)
    }

    @Get('end')
    async endTalk(@Res() res, @Query() query:GetSingleTalk){
        const response = await this.talkService.endTalk(query.id)
        return res.status(response.responseCode).send(response)
    }

    @Patch('/add-attendee')
    async addAttendee(@Res() res, @Body() body: AddAttendeeeToTalk){
        const response = await this.talkService.addAttendee(body)
        return res.status(response.responseCode).send(response)
    }


    @Post('send-message')
    async sendMessage(@Res() res, @Body() body: SendMessage){
        const response = await this.talkService.sendMessage(body)
        return res.status(response.responseCode).send(response)
    }

    @Delete('')
    async deleteTalk(@Res() res, @Query() query: GetSingleTalk){
        const response = await this.talkService.deleteTalk(query.id)
        return res.status(response.responseCode).send(response)
    }
}