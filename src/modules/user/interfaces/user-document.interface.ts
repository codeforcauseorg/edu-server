import { Document, Schema as SchemaTypes } from 'mongoose';

export interface UserDoc extends Document {
  first_name: string;

  last_name: string;

  email: string;

  phone: string;

  address?: string;

  description?: string;

  isAdmin: boolean;

  photoUrl?: string;

  score: number;

  coverPhotoUrl?: string;

  wishlist: SchemaTypes.Types.ObjectId[];
}
