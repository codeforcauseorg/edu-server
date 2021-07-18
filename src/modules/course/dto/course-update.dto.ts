import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { TagType } from '../course-tag.enum';
import { courseLevelType } from '../courseLevel.enum';

export class UpdateCourseDTO {
  /**
   * The name of the course
   * @example 'Rest Apis'
   */
  @IsString()
  readonly name: string;

  /**
   * The original price of the course
   * @example 400
   */
  @IsNumber()
  readonly originalPrice: number;

  /**
   * Whether the user is active or not in the course
   * @example true
   */
  @IsBoolean()
  readonly active: boolean;

  /**
   * The number of coupons of the course
   * @example 5
   */
  @IsNumber()
  readonly coupons: number;

  /**
   * The number of videos of the course
   * @example 3
   */
  @IsNumber()
  readonly video_num: number;

  /**
   * The duration of the course
   * @example '11 hours'
   */
  @IsString()
  readonly duration: string;

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
  @IsOptional()
  mentor: string[];

  /**
   * The number of enrollments of the course
   * @example 100001
   */
  @IsOptional()
  no_of_enrollments: number;

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

  /**
   * The discounted price of the course
   * @example 120
   */
  @IsNumber()
  crossPrice: number;

  /**
   * The short description of the course
   * @example 'Short description--'
   */
  @IsString()
  courseShortDescription: string;

  /**
   * The long description of the course
   * @example 'Long description--'
   */
  @IsString()
  courseLongDescription: string;

  /**
   * The rating of the course
   * @example 5
   */
  @IsNumber()
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
