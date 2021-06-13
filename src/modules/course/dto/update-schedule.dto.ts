import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateScheduleDto {
  @IsNotEmpty()
  @IsString()
  chapterName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  time: string;
}
