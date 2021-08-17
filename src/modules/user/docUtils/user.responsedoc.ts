export default class UserResponseBody {
  /**
   * UserId
   * @example 60ccf3037025096f45cb87bf
   */
  id: string;

  /**
   * First name of the user
   * @example 'John'
   */
  first_name: string;

  /**
   * Last name of the user
   * @example 'Doe'
   */
  last_name: string;

  /**
   * Email of the user
   * @example 'john@example.com'
   */
  email: string;

  /**
   * Phone number of the user
   * @example '9000500000'
   */
  phone: string;

  /**
   * Address of the user
   * @example 'Block C Amsterdam'
   */
  address: string;

  /**
   * Description of the user
   * @example 'Aspiring Software Developer'
   */
  description: string;

  /**
   * Score of the user
   * @example 100
   */
  score: number;

  /**
   * The field to show the role
   * @example "student"
   * @default "student"
   */
  role: string;

  /**
   * The photo url
   * @example 'https://g.gle/mypic.jpeg'
   */
  photoUrl: string;

  /**
   * The cover photo url
   * @example 'https://g.gle/mycover.jpeg'
   */
  coverPhotoUrl?: string;

  /**
   * The Wishlisted Courses
   * @example ["60ccf3037025096f45cb87ba", "60ccf3037025096f45cb87bq"]
   */
  wishlist: string[];

  /**
   * The Courses added to Cart
   * @example ["60ccf3037025096f45cb87ba", "60ccf3037025096f45cb87bq"]
   */
  cartList: string[];

  /**
   * The Firebase Id
   * @example "60ccf3037025096f45cb87ba"
   */
  fId: string;

  /**
   * Login Time
   * @example "Wed Aug 18 2021 00:13:13 GMT+0530 (India Standard Time)"
   */
  log_in_time: string;
}

interface video {
  num: number;
  timestamp?: Date;
}

export class EnrolledCourseResponseBody {
  /**
   * Student Id
   * @example "6079cf782f9a2181bc7aadbf"
   */
  studentId: string;

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
   * @example { num: 1, timestamp: "12:PM" }
   */
  currentVideo: video[];

  /**
   * The doubts of the student
   * @example ['problem in BFS', 'unable to understand Dynamic Programming']
   */
  doubts: string[];

  /**
   * Course Id
   * @example "60ccf06ad682336931f0a61b"
   */
  courseId: string;
}

export class getAllGamifiedResponseBody {
  /**
   * First name of the user
   * @example 'John'
   */
  first_name: string;

  /**
   * Last name of the user
   * @example 'Doe'
   */
  last_name: string;

  /**
   * Score of the user
   * @example 100
   */
  score: number;

  /**
   * The photo url
   * @example 'https://g.gle/mypic.jpeg'
   */
  photoUrl: string;
}
