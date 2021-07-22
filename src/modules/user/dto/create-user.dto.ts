import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  /**
   * First name of the user
   * @example 'John'
   */
  @IsNotEmpty()
  readonly first_name: string;

  /**
   * Last name of the user
   * @example 'Doe'
   */
  readonly last_name: string;

  /**
   * Email of the user
   * @example 'john@example.com'
   */
  @IsNotEmpty()
  readonly email: string;

  /**
   * Phone number of the user
   * @example '9000500000'
   */
  @IsNotEmpty()
  readonly phone: string;

  /**
   * Address of the user
   * @example 'Block C Amsterdam'
   */
  readonly address?: string;

  /**
   * Description of the user
   * @example 'Aspiring Software Developer'
   */
  readonly description?: string;

  /**
   * score of user
   * @example 100
   */
  readonly score: number;

  /**
   * The field to show whether the students is Admin or not
   * @example false
   * @default false
   */
  readonly isAdmin: boolean;

  /**
   * The photo url
   * @example 'https://g.gle/mypic.jpeg'
   */
  photoUrl?: string;

  /**
   * The cover photo url
   * @example 'https://g.gle/mycover.jpeg'
   */
  coverPhotoUrl?: string;
}
