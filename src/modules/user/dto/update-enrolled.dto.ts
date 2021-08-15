interface video {
  num: number;
  timestamp?: Date;
}

export class UpdateEnrolledDTO {
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
}
