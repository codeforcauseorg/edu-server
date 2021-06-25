import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ReviewType } from '../review.enum';

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsString()
  reviewerName: string;

  @IsNotEmpty()
  @IsString()
  reviewDescription: string;

  @IsNotEmpty()
  occupation: ReviewType;

  @IsNotEmpty()
  @IsNumber()
  raitedStars: number;
}
