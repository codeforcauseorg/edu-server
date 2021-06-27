import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { TagType } from '../course-tag.enum';
import { courseLevelType } from '../courseLevel.enum';

export class CreateCourseDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  @IsDateString()
  readonly start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsNotEmpty()
  readonly duration: string;

  @IsNotEmpty()
  readonly active: boolean;

  readonly coupons: number;

  @IsNotEmpty()
  @IsNumber()
  readonly video_num: number;

  @IsNotEmpty()
  @IsUrl()
  readonly sharable_link: string;

  @IsNotEmpty()
  @IsArray()
  mentor: [];

  @IsNotEmpty()
  @IsEnum(TagType)
  tags: TagType[];

  @IsNotEmpty()
  courseDetails: string;

  @IsNotEmpty()
  @IsEnum(courseLevelType)
  courseLevel: courseLevelType;

  @IsUrl()
  @IsNotEmpty()
  courseThumbnail: string;

  @IsUrl()
  @IsNotEmpty()
  courseTrailerUrl: string;
}
