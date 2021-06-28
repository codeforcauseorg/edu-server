import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { TagType } from '../course-tag.enum';
import { courseLevelType } from '../courseLevel.enum';

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
   * The sharable link of the course
   * @example 'https://sharable_link.com'
   */
  @IsUrl()
  @IsOptional()
  readonly sharable_link: string;

  /**
   * The Mentor of the course
   * @example ['John Doe']
   */
  @IsArray()
  mentor: [];

  /**
   * The Tag associated with the course
   * @example WEB_DEV
   */
  @IsNotEmpty()
  @IsEnum(TagType)
  tags: TagType[];

  /**
   * The details of the course
   * @example 'The course gives a hands on learning experience on Rest APIs and Javascript'
   */
  @IsNotEmpty()
  courseDetails: string;

  /**
   * The level associated with the course
   * @example BEGINNER
   */
  @IsNotEmpty()
  @IsEnum(courseLevelType)
  courseLevel: courseLevelType;

  /**
   * The link/URL of the course
   * @example 'https://codeforcause.org/courses'
   */
  @IsUrl()
  @IsNotEmpty()
  courseThumbnail: string;

  /**
   * The link/URL of the course trailer
   * @example 'https://codeforcause.org/courseTrailer'
   */
  @IsUrl()
  @IsNotEmpty()
  courseTrailerUrl: string;
}
