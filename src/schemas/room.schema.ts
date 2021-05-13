import { Chat } from './chat.schema';
import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  id: string;

  @Prop({ required: true, maxlength: 20, minlength: 5 })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' })
  chats: Chat;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  connectedUsers: User;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
