import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMentorDTO {
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
  @IsString()
  email: string;

  /**
   * number of students under the mentorship of that mentor
   * @example 500
   */
  @IsNotEmpty()
  @IsNumber()
  number_of_students: number;
}
