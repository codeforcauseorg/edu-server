import { ApiProperty } from '@nestjs/swagger';

interface video {
  num: number;
  timestamp?: Date;
}

export class UpdateEnrolledDTO {
  @ApiProperty({
    type: [Boolean],
    description: 'The videos watched by the student',
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
}
