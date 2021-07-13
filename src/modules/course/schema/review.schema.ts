import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schema/user.schema';
import { Document, Schema as SchemaTypes } from 'mongoose';
import { ReviewType } from '../review.enum';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true, type: SchemaTypes.Types.ObjectId, ref: 'User' })
  reviewerId: User;

  @Prop({ required: true })
  reviewerName: string;

  @Prop({ required: true })
  reviewDescription: string;

  @Prop({ required: true })
  occupation: ReviewType;

  @Prop({})
  stars: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.methods.toJSON = function () {
  const reviewObject = this.toObject();

  reviewObject.id = reviewObject._id;

  delete reviewObject.__v;
  delete reviewObject._id;

  return reviewObject;
};
