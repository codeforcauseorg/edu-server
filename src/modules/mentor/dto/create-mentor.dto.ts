import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMentorDTO {
  /**
   * name of the mentor
   * @example 'Anuj Garg'
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Email of the mentor
   * @example 'anuj@codeforcause.org'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * number of students under the mentorship of that mentor
   * @example 500
   */
  @IsNotEmpty()
  @IsNumber()
  number_of_students: number;

  /**
   * photo url of the mentor
   * @example 'https://g.gle/mypic.jpeg'
   */
  @IsNotEmpty()
  @IsUrl()
  mentorPhoto: string;
}
