import { Document } from 'mongoose';

export interface User extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly description: string;
  readonly score: number;
  readonly isAdmin: boolean;
  readonly created_at: Date;
  readonly photourl: string;
  readonly coverPhotoUrl: string;
  enrolled_courses: string[];
}
