import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaType, Document } from 'mongoose';
import { User } from '../../user/schema/user.schema';
import { Room } from '../../../schemas/room.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  original_sender: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'Room' })
  room: Room | string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
