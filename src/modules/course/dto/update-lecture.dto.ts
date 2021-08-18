import { IsString, IsUrl } from 'class-validator';

export class UpdateLectureDto {
  /**
   * name of the lecture
   * @example "Play with pandas"
   */
  @IsString()
  lectureName?: string;

  /**
   * The description of the lecture in the schedule
   * @example "The pandas library"
   */
  @IsString()
  description?: string;

  /**
   * The length of the video
   * @example "5 minutes"
   */
  @IsString()
  time?: string;

  /**
   * The url video
   * @example "https://codeforcause.org/video/1"
   */
  @IsString()
  @IsUrl()
  lectureVideoUrl?: string;
}
