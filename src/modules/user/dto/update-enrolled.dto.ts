import { ApiProperty } from '@nestjs/swagger';

interface video {
  num: number;
  timestamp?: Date;
}

export class UpdateEnrolledDTO {
  @ApiProperty({
    type: [Boolean],
    description: 'The description of the student',
    default: '',
  })
  videosWatched: boolean[];

  @ApiProperty({
    type: [Boolean],
    description: 'The assignments doen by the student',
    default: '',
  })
  assignmentsDone: boolean[];

  @ApiProperty({
    description: 'The videos',
    default: '',
  })
  currentVideo: video[];

  @ApiProperty({
    type: [String],
    description: 'The doubts of the student',
    default: '',
  })
  doubts: string[];
}
