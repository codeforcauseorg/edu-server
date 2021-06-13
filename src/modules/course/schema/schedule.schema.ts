import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true })
  chapterName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  time: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

ScheduleSchema.methods.toJSON = function () {
  const scheduleObject = this.toObject();

  delete scheduleObject.__v;

  return scheduleObject;
};
