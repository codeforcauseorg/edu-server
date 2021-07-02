import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssignmentDocument = Assignment & Document;

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ required: true })
  assignmentLink: string;

  @Prop({ required: true })
  assignmenDescription: string;

  @Prop({ required: true })
  createdBy: string;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);

AssignmentSchema.methods.toJSON = function () {
  const assignmentObject = this.toObject();
  assignmentObject.id = assignmentObject._id;
  delete assignmentObject.__v;
  delete assignmentObject._id;
  return assignmentObject;
};
