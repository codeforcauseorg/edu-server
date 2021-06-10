import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true })
  chapterName: string;

  @Prop({})
  description: string;

  @Prop({ required: true })
  time: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
