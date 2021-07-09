import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDoubtAnswerDto {
  @IsString()
  @IsNotEmpty()
  answered_by: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
