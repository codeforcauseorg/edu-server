import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';
import { Schema as SchemaType } from 'mongoose';

export type DoubtDocument = Doubt & mongoose.Document;

@Schema()
export class Doubt {
  @Prop({ required: true })
  tags: string[];

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'User' })
  asked_by: User;

  @Prop()
  answers: string[];

  @Prop({ default: false })
  is_resolved: boolean;

  @Prop()
  request_mentor: boolean;
}

export const DoubtSchema = SchemaFactory.createForClass(Doubt);
