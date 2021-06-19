import { IsArray, IsDateString, IsOptional, IsUrl } from 'class-validator';

export class UpdateCourseDTO {
  /**
   * The name of the course
   * @example 'Rest Apis'
   */
  readonly name: string;

  /**
   * The price of the course
   * @example 4
   */
  readonly price: number;

  /**
   * Whether the user is active or not in the course
   * @example true
   */
  readonly active: boolean;

  /**
   * The number of coupons of the course
   * @example 5
   */
  readonly coupons: number;

  /**
   * The number of videos of the course
   * @example 3
   */
  readonly video_num: number;

  /**
   * The duration of the course
   * @example '11 hours'
   */
  readonly duration: string;

  /**
   * The assignments of the course
   * @example ['Create Api task', 'Update Api Task']
   */
  readonly assignments: string[];

  /**
   * The start date of the course
   * @example '2020-02-05T06:35:22.000Z'
   */
  @IsDateString()
  @IsOptional()
  readonly start_date: Date;

  /**
   * The end date of the course
   * @example '2020-02-05T06:35:22.000Z'
   */
  @IsDateString()
  @IsOptional()
  end_date: Date;

  /**
   * The shareable link of the course
   * @example '88900xyz.com'
   */
  @IsUrl()
  @IsOptional()
  readonly sharable_link: string;

  /**
   * The Mentor of the course
   * @example ['John Doe']
   */
  @IsArray()
  @IsOptional()
  mentor: string[];

  /**
   * The number of enrollments of the course
   * @example 100001
   */
  @IsOptional()
  no_of_enrollments: number;
}
