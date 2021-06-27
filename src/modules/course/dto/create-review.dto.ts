import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ReviewType } from '../review.enum';
import { Schema } from 'mongoose';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  reviewerName: string;

  @IsNotEmpty()
  @IsString()
  reviewDescription: string;

  @IsNotEmpty()
  @IsEnum(ReviewType)
  occupation: ReviewType;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(0)
  stars: number;
}
