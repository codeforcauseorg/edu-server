import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  photoUrl: string;

  @Prop()
  coverPhotoUrl: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: [] })
  enrolled_courses: mongoose.Schema.Types.ObjectId[];

  @Prop({ default: [] })
  wishlist: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.__v;
  delete userObject['created_at'];

  return userObject;
};
