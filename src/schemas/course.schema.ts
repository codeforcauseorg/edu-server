import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: Date.now })
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop()
  duration: string;

  @Prop({ default: false })
  active: boolean;

  @Prop()
  coupons: number;

  @Prop({ default: 0 })
  student_num: number;

  @Prop()
  mentor: [];

  @Prop()
  video_num: number;

  @Prop()
  assignments: string[]; //links to questions pdf

  @Prop({ default: 0 })
  no_of_enrollments: number;

  @Prop()
  sharable_link: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
