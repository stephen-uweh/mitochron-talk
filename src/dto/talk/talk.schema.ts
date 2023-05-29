import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Attendee } from '../attendee/attendee.schema';

@Schema({ timestamps: true })
export class Talk {
    @Transform(({ value }) => value.toString())
    _id: Types.ObjectId;

    @Prop()
    title: string;

    @Prop([{type: MongooseSchema.Types.ObjectId, ref: Attendee.name}])
    @Type(() => Object)
    attendees: any

    @Prop({default: false})
    inSession: boolean
}


@Schema({ timestamps: true })
export class Message {
    @Transform(({ value }) => value.toString())
    _id: Types.ObjectId;

    @Prop()
    attendeeId: string;

    @Prop()
    talkId: string

    @Prop()
    message: string;
}


export type TalkDocument = Talk & Document;

export const TalkSchema = SchemaFactory.createForClass(Talk);


export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);

