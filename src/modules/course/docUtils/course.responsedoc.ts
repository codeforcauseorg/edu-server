import { Assignment } from 'modules/assignment/schema/assignment.schema';
import { TagType } from '../course-tag.enum';
import { courseLevelType } from '../courseLevel.enum';
import { ReviewType } from '../review.enum';
import { Review } from '../schema/review.schema';
import { Schedule } from '../schema/schedule.schema';

export default class CourseResponseBody {
  /**
   * CourseId
   * @example 60ccf3037025096f45cb87bf
   */
  id: string;

  /**
   * The name of the course
   * @example 'Rest Apis'
   */
  name: string;

  /**
   * The original price of the course
   * @example 400
   */
  originalPrice: number;

  /**
   * Whether the user is active or not in the course
   * @example true
   */
  active: boolean;

  /**
   * The number of coupons of the course
   * @example 5
   */
  coupons: number;

  /**
   * The number of videos of the course
   * @example 3
   */
  video_num: number;

  /**
   * The duration of the course
   * @example '11 hours'
   */
  duration: string;

  /**
   * The start date of the course
   * @example '2020-02-05T06:35:22.000Z'
   */
  start_date: Date;

  /**
   * The end date of the course
   * @example '2020-02-05T06:35:22.000Z'
   */
  end_date: Date;

  /**
   * The sharable link of the course
   * @example 'https://sharable_link.com'
   */
  sharable_link: string;

  /**
   * The Mentor of the course
   * @example ['John Doe']
   */
  mentor: string[];

  /**
   * The schedule of the course
   * @example []
   */
  schedule: Schedule[];

  /**
   * The schedule of the course
   * @example []
   */
  review: Review[];

  /**
   * The number of enrollments of the course
   * @example 100001
   */
  no_of_enrollments: number;

  /**
   * The Tag associated with the course
   * @example WEB_DEV
   */
  tags: TagType[];

  /**
   * The details of the course
   * @example 'The course gives a hands on learning experience on Rest APIs and Javascript'
   */
  courseDetails: string;

  /**
   * The level associated with the course
   * @example BEGINNER
   */
  courseLevel: courseLevelType;

  /**
   * The link/URL of the course
   * @example 'https://codeforcause.org/courses'
   */
  courseThumbnail: string;

  /**
   * The link/URL of the course trailer
   * @example 'https://codeforcause.org/courseTrailer'
   */
  courseTrailerUrl: string;

  /**
   * The assignments of the course
   * @example 'https://codeforcause.org/assignments/1'
   */
  assignments: Assignment[];

  /**
   * The discounted price of the course
   * @example 120
   */
  crossPrice: number;

  /**
   * The short description of the course
   * @example 'Short description--'
   */
  courseShortDescription: string;

  /**
   * The long description of the course
   * @example 'Long description--'
   */
  courseLongDescription: string;

  /**
   * The rating of the course
   * @example 5
   */
  rating: number;

  /**
   * The prerequisites of the course
   * @example ["HTML","CSS"]
   */
  prerequisites: string[];

  /**
   * The skills of the course
   * @example ["HTML","CSS"]
   */
  skills: string[];

  /**
   * what will one learn from the course
   * @example ["You will get to know about web technologies basics", "A good understanstanding of Html, css and JS", "You will learn about hooks and functional components"]
   */
  whatYouWillLearn: string[];
}

export class ScheduleResponseBody {
  /**
   * Schedule Id
   * @example "6079cf782f9a2181bc7aadbf"
   */
  id: string;

  /**
   * The chapter name of the schedule item
   * @example 'Rest Apis'
   */

  chapterName: string;

  /**
   * The description of the schedule item
   * @example 'A session on REST API which is an application programming interface (API or web API) that conforms to the constraints of REST architectural style and allows for interaction with RESTful web services.'
   */

  description: string;

  /**
   * The time required to finish the scheduled item
   * @example '11 hours'
   */

  time: string;
}

export class ReviewResponseBody {
  /**
   * Review Id
   * @example "6079cf782f9a2181bc7aadbf"
   */
  id: string;

  /**
   * name of the reviewer
   * @example "John Doe"
   */
  reviewerName: string;

  /**
   * The description of the Reviw
   * @example "The course was just fantastic"
   */
  reviewDescription: string;

  /**
   * The type of Review
   * @example STUDENT
   */
  occupation: ReviewType;

  /**
   * The number of stars given in the review
   * @example 5
   */
  stars: number;
}
