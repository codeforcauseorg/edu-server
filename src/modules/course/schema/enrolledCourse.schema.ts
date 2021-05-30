import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Course } from '../../course/schema/course.schema';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type EnrolledCourseDocument = EnrolledCourse & Document;

interface video {
  num: number;
  timestamp?: Date;
}

@Schema()
export class EnrolledCourse {
  @Prop({})
  eId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: [false, false, false, false, false] })
  videos_watched: boolean[];

  @Prop({ default: [false, false, false, false, false] })
  Assignments_done: boolean[];

  @Prop({ default: [] })
  currentVideo: video[];

  @Prop({ default: [] })
  doubts: string[];

  @Prop({})
  Course: mongoose.Schema.Types.ObjectId;
}

export const EnrolledCourseSchema = SchemaFactory.createForClass(
  EnrolledCourse,
);

EnrolledCourseSchema.virtual('students', {
  ref: 'User',
  localField: 'eId',
  foreignField: '_id',
});
