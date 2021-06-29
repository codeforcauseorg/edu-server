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
   * @example 'A session on REST API which is an application programming interface (API or web API) that conforms to the constraints of REST architectural style and allows for interaction with RESTful web services.'
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * The time required to finish the scheduled item
   * @example '11 hours'
   */
  @IsNotEmpty()
  @IsString()
  time: string;
}
