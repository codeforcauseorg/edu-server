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

  @Prop({ required: true })
  lectureNumber: number;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

ScheduleSchema.methods.toJSON = function () {
  const scheduleObject = this.toObject();

  scheduleObject.id = scheduleObject._id;

  delete scheduleObject.__v;
  delete scheduleObject._id;

  return scheduleObject;
};
