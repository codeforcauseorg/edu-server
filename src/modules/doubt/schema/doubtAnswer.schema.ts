import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type DoubtAnswerDocument = DoubtAnswer & mongoose.Document;

@Schema()
export class DoubtAnswer {
  @Prop({ required: true })
  answered_by: string;

  @Prop({ required: true })
  answer: string;
}

export const DoubtAnswerSchema = SchemaFactory.createForClass(DoubtAnswer);

DoubtAnswerSchema.methods.toJSON = function () {
  const doubtAnswerObject = this.toObject();
  doubtAnswerObject.id = doubtAnswerObject._id;

  delete doubtAnswerObject._id;
  delete doubtAnswerObject.__v;
  delete doubtAnswerObject['createdAt'];
  delete doubtAnswerObject['updatedAt'];

  return doubtAnswerObject;
};
