import { IsArray, IsDateString, IsOptional, IsUrl } from 'class-validator';

export class UpdateCourseDTO {
  readonly course_id: string;
  readonly name: string;
  readonly price: number;
  readonly active: boolean;
  readonly coupons: number;
  readonly video_num: number;
  readonly duration: string;
  assignments: string[];

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
}
