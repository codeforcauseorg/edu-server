import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as SchemaType } from 'mongoose';

export type DoubtAnswerDocument = DoubtAnswer & Document;

@Schema({ timestamps: true })
export class DoubtAnswer {
  @Prop({ required: true })
  answered_by: SchemaType.Types.ObjectId;

  @Prop({ required: true })
  answer: string;
}

export const DoubtAnswerSchema = SchemaFactory.createForClass(DoubtAnswer);

DoubtAnswerSchema.methods.toJSON = function () {
  const doubtAnswerObject = this.toObject();
  doubtAnswerObject.id = doubtAnswerObject._id;

  delete doubtAnswerObject._id;
  delete doubtAnswerObject.__v;

  return doubtAnswerObject;
};
