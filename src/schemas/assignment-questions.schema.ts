import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssignmentDocument = Assignment & Document;

@Schema()
export class Assignment {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  course_id: string;

  @Prop({ required: true })
  questions: [string];

  @Prop({ required: true })
  difficulty: string;

  @Prop({ default: false })
  active: boolean;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
