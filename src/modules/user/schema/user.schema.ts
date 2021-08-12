import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaTypes } from 'mongoose';
import { Role } from '../../../roles/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ default: '' })
  first_name: string;

  @Prop({ default: '' })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  photoUrl: string;

  @Prop({ default: '' })
  coverPhotoUrl: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: Role.STUDENT })
  role: string;

  @Prop({ default: [] })
  wishlist: SchemaTypes.Types.ObjectId[];

  @Prop({ default: [] })
  cartList: SchemaTypes.Types.ObjectId[];

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
