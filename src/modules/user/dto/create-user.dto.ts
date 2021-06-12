import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateUserDTO {
  /**
   * First name of user
   * @example John
   */
  @IsNotEmpty()
  readonly first_name: string;

  readonly last_name: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;

  readonly address: string;

  readonly description: string;

  readonly score: number;

  readonly isAdmin: boolean;

  @ApiProperty({ type: [Schema.Types.ObjectId] })
  readonly wishlist: Schema.Types.ObjectId[];

  photoUrl: string;

  coverPhotoUrl: string;
}
