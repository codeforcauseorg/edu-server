import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

interface video {
  num: number;
  timestamp?: Date;
}

export class CreateEnrolledDTO {
  @IsNotEmpty()
  studentId: mongoose.Schema.Types.ObjectId;

  videos_watched: boolean[];

  Assignments_done: boolean[];

  currentVideo: video[];

  doubts: string[];

  @IsNotEmpty()
  courseId: mongoose.Schema.Types.ObjectId;
}
