import { Document } from 'mongoose';

export interface Chat extends Document {
  readonly id: string;
  readonly sender: string;
  readonly original_sender: string;
  readonly chats: string;
}
