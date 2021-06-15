import { IsArray, IsDateString, IsOptional, IsUrl } from 'class-validator';

export class CreateCourseDto {
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
   * The name of the course
   * @example 'Rest Apis'
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
   * The end date of the course
   * @example '2020-02-05T06:35:22.000Z'
   */
  @IsArray()
  @IsOptional()
  mentor: [];
}
