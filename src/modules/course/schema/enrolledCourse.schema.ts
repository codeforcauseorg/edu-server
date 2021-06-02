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
  @Prop({})
  studentId: mongoose.Schema.Types.ObjectId;

  @Prop({})
  videos_watched: boolean[];

  @Prop({})
  assignmentsDone: boolean[];

  @Prop({})
  currentVideo: video[];

  @Prop({})
  doubts: string[];

  @Prop({})
  courseId: mongoose.Schema.Types.ObjectId;
}

export const EnrolledCourseSchema = SchemaFactory.createForClass(
  EnrolledCourse,
);

// Pre hook to set default values
EnrolledCourseSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const course = this;

  // finds the length of the videos watched and gives it a default value
  course['videos_watched'] = [true, true, false];
  course['videos_watched'].fill(false);

  // finds the length of assignments done  and gives it a default value

  next();
});

EnrolledCourseSchema.methods.toJSON = function () {
  const enrolledCourseObject = this.toObject();

  delete enrolledCourseObject.__v;
  delete enrolledCourseObject._id;

  return enrolledCourseObject;
};

EnrolledCourseSchema.virtual('students', {
  ref: 'User',
  localField: 'studentId',
  foreignField: '_id',
});
