import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop()
  Id: string;

  @Prop()
  Name: string;

  @Prop()
  Price: number;

  @Prop()
  Start_date: Date;

  @Prop()
  End_date: Date;

  @Prop()
  Duration: number;

  @Prop()
  Active: Boolean;

  @Prop()
  Coupons: number;

  @Prop()
  Student_num: number;

  @Prop()
  Video_num: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
