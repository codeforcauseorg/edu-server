import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateDoubtAnswerDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ type: Schema.Types.ObjectId })
  answered_by: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
