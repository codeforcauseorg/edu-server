import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  phone: number;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop()
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
