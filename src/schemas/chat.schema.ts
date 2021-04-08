import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  original_sender: string;

  @Prop({ required: true })
  chats: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
