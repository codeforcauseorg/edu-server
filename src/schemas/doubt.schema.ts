import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema'

export type DoubtDocument = Doubt & mongoose.Document;

@Schema()
export class Doubt {
  @Prop()
  tags: Object[]

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  asked_by: User;

  @Prop()
  answers: Object[];

  @Prop()
  is_resolved: boolean;

  @Prop()
  request_mentor: boolean;
}

export const DoubtSchema = SchemaFactory.createForClass(Doubt);
