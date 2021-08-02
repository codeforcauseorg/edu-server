import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLectureDto {
  /**
   * name of the lecture
   * @example "Play with pandas"
   */
  @IsNotEmpty()
  @IsString()
  lectureName: string;

  /**
   * The description of the lecture in the schedule
   * @example "The pandas library"
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * The length of the video
   * @example "5 minutes"
   */
  @IsNotEmpty()
  @IsString()
  time: string;
}
