import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMentorDTO {
  /**
   * name of the mentor
   * @example 'John Doe'
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Email of the mentor
   * @example 'john@gmail.com'
   */
  @IsNotEmpty()
  @IsString()
  email: string;

  /**
   * number of students under the mentorship of that mentor
   * @example 4
   */
  @IsNotEmpty()
  @IsNumber()
  number_of_students: number;
}
