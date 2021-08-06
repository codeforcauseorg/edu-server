import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaTypes } from 'mongoose';
import { Schedule } from './schedule.schema';
import { TagType } from '../course-tag.enum';
import { Review } from './review.schema';
import { courseLevelType } from '../courseLevel.enum';
import { Doubt } from '../../doubt/schema/doubt.schema';
import { Assignment } from '../../assignment/schema/assignment.schema';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  originalPrice: number;

  @Prop({ default: Date.now })
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop({})
  duration: string;

  @Prop({ default: false })
  active: boolean;

  @Prop()
  couponCode: string;

  @Prop({ default: 0 })
  student_num: number;

  @Prop({})
  mentor: string[];

  @Prop({})
  video_num: number;

  @Prop({ default: 0 })
  no_of_enrollments: number;

  @Prop()
  sharable_link: string;

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Schedule' }] })
  schedule: Schedule[];

  @Prop({ required: true })
  tags: TagType[];

  @Prop({ required: true })
  courseDetails: string;

  @Prop({ default: 'Training', required: true })
  courseLevel: courseLevelType;

  @Prop({ required: true })
  courseThumbnail: string;

  @Prop({})
  courseTrailerUrl: string;

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Doubt' }] })
  doubts: Doubt[];

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Assignment' }] })
  assignments: Assignment[];

  @Prop({ required: true })
  crossPrice: number;

  @Prop()
  courseShortDescription: string;

  @Prop()
  courseLongDescription: string;

  @Prop()
  rating: number;

  @Prop()
  prerequisites: string[];

  @Prop()
  skills: string[];

  @Prop()
  whatYouWillLearn: string[];

  @Prop()
  certificateUrl: string;

  @Prop({ default: false })
  isUpcoming: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.methods.toJSON = function () {
  const courseObject = this.toObject();
  courseObject.id = courseObject._id;
  delete courseObject.__v;
  delete courseObject['student_num'];
  delete courseObject['updatedAt'];
  delete courseObject['createdAt'];
  delete courseObject['no_of_enrollments'];
  delete courseObject._id;
  return courseObject;
};
