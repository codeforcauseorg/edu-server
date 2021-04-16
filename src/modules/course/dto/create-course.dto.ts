import { IsDateString, IsNotEmpty } from 'class-validator';

export class CourseDTO {
  @IsNotEmpty()
  readonly id: string;

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

  readonly video_num: number;
}
