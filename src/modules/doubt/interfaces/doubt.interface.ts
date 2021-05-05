import { Document } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export interface Doubt extends Document {
  readonly asked_by: User;
  readonly answers: string[];
  readonly is_resolved: boolean;
  readonly request_mentor: boolean;
}
