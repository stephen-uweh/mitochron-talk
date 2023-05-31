import { IsString } from 'class-validator';

export class AddTalkInput {
    @IsString()
    title: string;
}

export class GetSingleTalk {
    @IsString()
    id: string;
}


export class AddAttendeeeToTalk {
    @IsString()
    talkId: string;

    @IsString()
    attendeeEmail: string
}

export class SendMessage {
    @IsString()
    talkId: string;

    @IsString()
    attendeeEmail: string;

    @IsString()
    message: string;
}