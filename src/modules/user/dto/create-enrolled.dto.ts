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
  @ApiProperty({
    type: Schema.Types.ObjectId,
    description: 'The id of the student',
  })
  studentId: Schema.Types.ObjectId;

  @ApiProperty({
    type: [Boolean],
    description: 'videos watched by the student',
    default: [false, false],
  })
  videosWatched: boolean[];

  @ApiProperty({
    type: [Boolean],
    description: 'The assignments done by the student',
    default: [false, false],
  })
  assignmentsDone: boolean[];

  @ApiProperty({
    description: 'The current video where student left',
    default: { num: 1, timestamp: Date.now() },
  })
  currentVideo: video[];

  @ApiProperty({
    type: [String],
    description: 'The doubts of the student',
    default: ['problem in BFS', 'unable to understand Dynamic Programming'],
  })
  doubts: string[];

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    type: Schema.Types.ObjectId,
    description: 'The id of the course',
  })
  courseId: Schema.Types.ObjectId;
}
