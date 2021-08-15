import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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

  /**
   * videos watched by the student
   * @example [false, false]
   */
  videosWatched: boolean[];

  /**
   * The assignments done by the student
   * @example [false, false]
   */
  assignmentsDone: boolean[];

  /**
   * The current video where student left
   * @example { num: 1, timestamp: Date.now() }
   */
  currentVideo: video[];

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: Schema.Types.ObjectId })
  courseId: Schema.Types.ObjectId;
}
