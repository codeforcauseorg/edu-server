import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnnouncementDTO {
  /**
   * The title of the announcement
   * @example 'New course on Web Development'
   */
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * The description of the announcement
   * @example 'The wait is finally over as teh new course on Web Development has been released. The course will take you through the basics and help you learn and make projects along the way'
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * Whether the announcement was read or not
   * @example true
   */
  @IsNotEmpty()
  @IsBoolean()
  read: boolean;
}
