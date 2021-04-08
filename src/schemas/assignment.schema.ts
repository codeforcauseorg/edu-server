import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssignmentDocument = Assignment & Document;

@Schema()
export class Assignment {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  link: string;

  @Prop()
  submit_by: number;

  @Prop()
  created_at: Date;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
