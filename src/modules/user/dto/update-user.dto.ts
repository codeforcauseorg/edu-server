import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateUserDTO {
  /**
   * First name of the user
   * @example 'John'
   */
  readonly first_name?: string;

  /**
   * Last name of the user
   * @example 'Doe'
   */
  readonly last_name?: string;

  /**
   * Phone number of the user
   * @example '9000500000'
   */
  readonly phone?: string;

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
   * @example 'unsplash1231main.jpeg'
   */
  photoUrl: string;

  /**
   * The cover photo url
   * @example 'unsplash123.jpeg'
   */
  coverPhotoUrl?: string;
}
