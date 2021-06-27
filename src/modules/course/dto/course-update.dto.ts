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

export class UpdateCourseDTO {
  readonly name: string;
  readonly price: number;
  readonly active: boolean;
  readonly coupons: number;
  readonly video_num: number;
  readonly duration: string;
  readonly assignments: string[];

  @IsDateString()
  @IsOptional()
  readonly start_date: Date;

  @IsDateString()
  @IsOptional()
  end_date: Date;

  @IsUrl()
  @IsOptional()
  readonly sharable_link: string;

  @IsArray()
  @IsOptional()
  mentor: [];

  @IsOptional()
  no_of_enrollments: number;

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
