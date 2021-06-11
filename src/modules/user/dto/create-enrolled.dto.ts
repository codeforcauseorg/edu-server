import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

interface video {
  num: number;
  timestamp?: Date;
}

export class CreateEnrolledDTO {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: Schema.Types.ObjectId })
  studentId: Schema.Types.ObjectId;

  videosWatched: boolean[];

  assignmentsDone: boolean[];

  currentVideo: video[];

  doubts: string[];

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: Schema.Types.ObjectId })
  courseId: Schema.Types.ObjectId;
}
