import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Transform } from 'class-transformer';


@Schema({ timestamps: true })
export class Attendee {

  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({unique: true})
  email: string;

  @Prop()
  lastName: string;

  @Prop()
  firstName: string;

  @Prop()
  phone: string
}


export type AttendeeDocument = Attendee & Document;

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);

AttendeeSchema.index({ email: 1 });
