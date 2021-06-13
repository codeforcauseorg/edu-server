import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { Schedule } from '../schema/schedule.schema';

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
}
