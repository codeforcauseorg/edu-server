interface video {
  num: number;
  timestamp?: Date;
}

export class UpdateEnrolledDTO {
  videosWatched: boolean[];

  assignmentsDone: boolean[];

  currentVideo: video[];

  doubts: string[];
}
