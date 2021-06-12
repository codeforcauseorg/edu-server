import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

interface video {
  num: number;
  timestamp?: Date;
}

export class CreateEnrolledDTO {
  @IsNotEmpty()
  @IsMongoId()
  studentId: Schema.Types.ObjectId;

  videosWatched: boolean[];

  assignmentsDone: boolean[];

  currentVideo: video[];

  doubts: string[];

  @IsNotEmpty()
  @IsMongoId()
  courseId: Schema.Types.ObjectId;
}
