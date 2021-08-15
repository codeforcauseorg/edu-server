import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema } from 'mongoose';
import { TagType } from '../doubt-tag.enum';

export class CreateDoubtDto {
  /**
   * The tags associated with the doubt
   * @example ["Web development"]
   */
  @IsNotEmpty()
  @IsArray()
  @IsEnum(TagType, { each: true })
  tags?: TagType[];

  /**
   * The id of the person who asked the doubt
   * @example '60ccf3037025096f45cb87bf'
   */
  @IsNotEmpty()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ type: Schema.Types.ObjectId })
  asked_by: Schema.Types.ObjectId;

  /**
   * The question/doubt
   * @example "Why do we use memoization over tabulation ?"
   */
  @IsString()
  @IsNotEmpty()
  question: string;

  /**
   * Whether the metor's assistance is needed or not for the doubt
   * @example true
   */
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  request_mentor?: boolean;

  /**
   * Whether the doubt was resolved or not
   * @example true
   */
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  is_resolved: boolean;

  /**
   * The doubt body
   * @example "the doubt description is ...."
   */
  @IsString()
  doubtBody?: string;

  /**
   * The person who aasked the doubt
   * @example "John Doe"
   */
  @IsString()
  @IsNotEmpty()
  askedBy_name: string;
}
