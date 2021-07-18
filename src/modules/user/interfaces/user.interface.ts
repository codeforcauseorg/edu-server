import { Schema as SchemaTypes } from 'mongoose';

export interface User {
  first_name: string;

  last_name: string;

  email: string;

  phone: string;

  address?: string;

  description?: string;

  isAdmin: boolean;

  photoUrl?: string;

  coverPhotoUrl?: string;

  score: number;

  _id: string;

  wishlist: SchemaTypes.Types.ObjectId[];
}
