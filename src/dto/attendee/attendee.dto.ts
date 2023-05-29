import { IsString } from 'class-validator';

export class AddAttendeeInput {

    @IsString()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phone: string;

}


export class GetSingleAttendeeInput {
    @IsString()
    id: string
}