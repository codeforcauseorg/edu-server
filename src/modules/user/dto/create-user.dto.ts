import { IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  readonly last_name: string;

  /**
   * Phone number of the user
   * @example '9000500000'
   */
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
