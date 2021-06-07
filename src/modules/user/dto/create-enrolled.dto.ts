import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

interface video {
  num: number;
  timestamp?: Date;
}

export class CreateEnrolledDTO {
  @IsNotEmpty()
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'The id of the student',
    default: '605e3fd9acc33583fb389aec',
  })
  studentId: mongoose.Schema.Types.ObjectId;

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
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'The id of the course',
    default: '605e3fd9acc33583fb389aec',
  })
  courseId: mongoose.Schema.Types.ObjectId;
}
