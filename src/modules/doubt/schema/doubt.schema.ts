import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Schema as SchemaType } from 'mongoose';
import { TagType } from '../doubt-tag.enum';
import { DoubtAnswer } from './doubtAnswer.schema';

export type DoubtDocument = Doubt & mongoose.Document;

@Schema()
export class Doubt {
  @Prop({ required: true })
  tags: TagType[];

  @Prop({ required: true })
  asked_by: string;

  @Prop({ type: [{ type: SchemaType.Types.ObjectId, ref: 'DoubtAnswer' }] })
  answers: DoubtAnswer[];

  @Prop({ required: true })
  question: string;

  @Prop({ default: false })
  is_resolved: boolean;

  @Prop({ required: true })
  request_mentor: boolean;
}

export const DoubtSchema = SchemaFactory.createForClass(Doubt);

DoubtSchema.methods.toJSON = function () {
  const doubtObject = this.toObject();
  doubtObject.id = doubtObject._id;

  delete doubtObject._id;
  delete doubtObject.__v;
  delete doubtObject['createdAt'];
  delete doubtObject['updatedAt'];

  return doubtObject;
};
