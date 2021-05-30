import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type EnrolledCourseDocument = EnrolledCourse & Document;

interface video {
  num: number;
  timestamp?: Date;
}

@Schema()
export class EnrolledCourse {
  @Prop({ default: [].fill(false, 10) })
  videos_watched: boolean[];

  @Prop({ default: [].fill(false, 10) })
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

EnrolledCourseSchema.pre('save', (next) => {
  next();
});

EnrolledCourseSchema.methods.toJSON = function () {
  const enrolledCourseObject = this.toObject();

  delete enrolledCourseObject.__v;

  return enrolledCourseObject;
};

EnrolledCourseSchema.virtual('students', {
  ref: 'User',
  localField: '_id',
  foreignField: '_id',
});
