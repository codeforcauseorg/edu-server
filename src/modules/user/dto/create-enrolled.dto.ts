import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

interface video {
  num: number;
  timestamp?: Date;
}

export class CreateEnrolledDTO {
  @IsNotEmpty()
  eId: mongoose.Schema.Types.ObjectId;

  videos_watched: boolean[];

  Assignments_done: boolean[];

  currentVideo: video[];

  doubts: string[];

  Course: mongoose.Schema.Types.ObjectId;
}
