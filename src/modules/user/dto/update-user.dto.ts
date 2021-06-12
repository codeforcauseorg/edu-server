import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateUserDTO {
  /**
   * First name of the user
   * @example 'John'
   */
  @IsNotEmpty()
  readonly first_name: string;

  /**
   * Last name of the user
   * @example 'Stark'
   */
  readonly last_name: string;

  /**
   * Email of the user
   * @example 'John@gmai.com'
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
   * @example 'Mayur Vihar, Delhi'
   */
  readonly address: string;

  /**
   * Description of the user
   * @example 'Aspiring Software Developer'
   */
  readonly description: string;

  /**
   * Number of user
   * @example 100
   */
  readonly score: number;

  /**
   * The field to show whether the students is Admin or not
   * @example false
   */
  readonly isAdmin: boolean;

  @ApiProperty({ type: [Schema.Types.ObjectId] })
  @IsArray()
  readonly wishlist: Schema.Types.ObjectId[];

  /**
   * The photo url
   * @example 'unsplash1231main.jpeg'
   */
  photoUrl: string;

  /**
   * The cover photo url
   * @example 'unsplash123.jpeg'
   */
  coverPhotoUrl: string;
}
