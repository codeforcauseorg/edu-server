import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateUserDTO {
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

  readonly wishlist: mongoose.Schema.Types.ObjectId[];

  photoUrl: string;

  coverPhotoUrl: string;
}
