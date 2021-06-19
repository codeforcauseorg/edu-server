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
   * The price of the course
   * @example 400INR
   */
  price: number;

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
   * The assignments of the course
   * @example ['Create Api task', 'Update Api Task']
   */
  assignments: string[];

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
   * The shareable link of the course
   * @example '88900xyz.com'
   */
  sharable_link: string;

  /**
   * The Mentor of the course
   * @example ['John Doe']
   */
  mentor: string[];

  /**
   * The schedule of teh course
   * @example []
   */
  schedule: Schedule[];
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
   * @example 'Rest Apis'
   */

  description: string;

  /**
   * The time required to finish the scheduled item
   * @example 'Rest Apis'
   */

  time: string;
}
