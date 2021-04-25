import { Document } from 'mongoose';

export interface Doubt extends Document {
  readonly id: string;
  readonly asked_by;
  readonly answers: [];
  readonly is_resolved: boolean;
  readonly request_mentor: boolean;
}
