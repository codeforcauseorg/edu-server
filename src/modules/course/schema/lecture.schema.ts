import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LectureDocument = Lecture & Document;

@Schema({ timestamps: true })
export class Lecture {
  @Prop({ required: true })
  lectureName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  lectureVideoUrl: string;

  @Prop({ required: true })
  time: string;
}

export const LectureSchema = SchemaFactory.createForClass(Lecture);

LectureSchema.methods.toJSON = function () {
  const lectureObject = this.toObject();

  lectureObject.id = lectureObject._id;

  delete lectureObject.__v;
  delete lectureObject._id;

  return lectureObject;
};
