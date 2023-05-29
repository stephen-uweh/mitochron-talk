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
}


export type TalkDocument = Talk & Document;

export const TalkSchema = SchemaFactory.createForClass(Talk);

