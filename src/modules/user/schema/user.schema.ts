import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaTypes } from 'mongoose';
import { Role } from '../../../roles/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
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

  @Prop({ default: Role.STUDENT })
  role: string;

  @Prop({ default: [] })
  wishlist: SchemaTypes.Types.ObjectId[];

  @Prop()
  fId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  userObject.id = userObject._id;

  delete userObject._id;
  delete userObject.__v;
  delete userObject['createdAt'];
  delete userObject['updatedAt'];

  return userObject;
};
