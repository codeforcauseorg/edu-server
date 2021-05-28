import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnrolledCourseDocument = EnrolledCourse & Document;

interface video {
  num: number;
  timestamp?: Date;
}

@Schema()
export class EnrolledCourse {
  @Prop({ required: true, default: [] })
  videos_watched: boolean[];

  @Prop({ required: true, default: [] })
  Assignments_done: boolean[];

  @Prop({ default: [] })
  currentVideo: video[];

  @Prop({ default: [] })
  doubts: string[];
}

export const EnrolledCourseSchema = SchemaFactory.createForClass(
  EnrolledCourse,
);