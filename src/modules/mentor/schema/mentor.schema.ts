import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Course } from '../../course/schema/course.schema';

export type MentorDocument = Mentor & Document;

@Schema({ timestamps: true })
export class Mentor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: [] })
  courses: Course[];

  @Prop({ default: 0 })
  number_of_students: number;
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);

MentorSchema.methods.toJSON = function () {
  const mentorObject = this.toObject();
  mentorObject.id = mentorObject._id;

  delete mentorObject._id;
  delete mentorObject.__v;
  delete mentorObject['createdAt'];
  delete mentorObject['updatedAt'];

  return mentorObject;
};
