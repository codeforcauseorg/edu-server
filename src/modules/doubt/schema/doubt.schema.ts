import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaType } from 'mongoose';
import { TagType } from '../doubt-tag.enum';
import { DoubtAnswer } from './doubtAnswer.schema';
import { Document } from 'mongoose';

export type DoubtDocument = Doubt & Document;

@Schema({ timestamps: true })
export class Doubt {
  @Prop()
  tags: TagType[];

  @Prop({ required: true })
  asked_by: SchemaType.Types.ObjectId;

  @Prop({ type: [{ type: SchemaType.Types.ObjectId, ref: 'DoubtAnswer' }] })
  answers: DoubtAnswer[];

  @Prop({ required: true })
  question: string;

  @Prop({ default: false })
  is_resolved: boolean;

  @Prop()
  request_mentor: boolean;

  @Prop()
  photoUrl: string;

  @Prop()
  askedBy_name: string;

  @Prop()
  doubtBody: string;
}

export const DoubtSchema = SchemaFactory.createForClass(Doubt);

DoubtSchema.methods.toJSON = function () {
  const doubtObject = this.toObject();
  doubtObject.id = doubtObject._id;

  delete doubtObject._id;
  delete doubtObject.__v;

  return doubtObject;
};
