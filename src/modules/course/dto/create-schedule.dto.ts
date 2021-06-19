import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  /**
   * The chapter name of the schedule item
   * @example 'Rest Apis'
   */
  @IsNotEmpty()
  @IsString()
  chapterName: string;

  /**
   * The description of the schedule item
   * @example 'Rest Apis'
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * The time required to finish the scheduled item
   * @example 'Rest Apis'
   */
  @IsNotEmpty()
  @IsString()
  time: string;
}
