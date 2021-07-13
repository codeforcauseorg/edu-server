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

export class CreateReviewDto {
  /**
   * Reviewer's MongoId
   * @example "60dcbd2609c34c1e48d2d0ae"
   */
  @IsNotEmpty()
  @IsMongoId()
  reviewerId: string;

  /**
   * name of the reviewer
   * @example "John Doe"
   */
  @IsNotEmpty()
  @IsString()
  reviewerName: string;

  /**
   * The description of the Reviw
   * @example "The course was just fantastic"
   */
  @IsNotEmpty()
  @IsString()
  reviewDescription: string;

  /**
   * The type of Review
   * @example STUDENT
   */
  @IsNotEmpty()
  @IsEnum(ReviewType)
  occupation: ReviewType;

  /**
   * The number of stars given in the review
   * @example 5
   */
  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(0)
  stars: number;
}
