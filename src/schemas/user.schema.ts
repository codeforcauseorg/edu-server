import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Chat } from './chat.schema';
import { Room } from './room.schema';
import * as mongoose from 'mongoose';

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

  @Prop()
  created_at: Date;

  @Prop({ default: [] })
  enrolled_courses: string[];

  @Prop({ default: [] })
  wishlist: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  joinedRooms: Room | string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  chats: Chat;
}

export const UserSchema = SchemaFactory.createForClass(User);
