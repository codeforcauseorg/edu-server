import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateDoubtAnswerDto {
  /**
   * The name of the person who answered the doubt
   * @example '60ccf3037025096f45cb87bf'
   */
  @IsNotEmpty()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ type: Schema.Types.ObjectId })
  answered_by: Schema.Types.ObjectId;

  /**
   * The asnwer to the doubt
   * @example "We use this to conserve time by applying alogorithm of lesser time complexity"
   */
  @IsString()
  @IsNotEmpty()
  answer: string;
}
