import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type EnrolledCourseDocument = EnrolledCourse & Document;

interface video {
  num: number;
  timestamp?: Date;
}

@Schema({
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class EnrolledCourse {
  @Prop({ required: true })
  studentId: mongoose.Schema.Types.ObjectId;

  @Prop()
  videosWatched: boolean[];

  @Prop()
  assignmentsDone: boolean[];

  @Prop()
  currentVideo: video[];

  @Prop()
  doubts: string[];

  @Prop({ required: true })
  courseId: mongoose.Schema.Types.ObjectId;
}

export const EnrolledCourseSchema = SchemaFactory.createForClass(
  EnrolledCourse,
);

EnrolledCourseSchema.methods.toJSON = function () {
  const enrolledCourseObject = this.toObject();
  enrolledCourseObject.id = enrolledCourseObject._id;

  delete enrolledCourseObject.__v;
  delete enrolledCourseObject._id;

  return enrolledCourseObject;
};

EnrolledCourseSchema.virtual('students', {
  ref: 'User',
  localField: 'studentId',
  foreignField: '_id',
});
