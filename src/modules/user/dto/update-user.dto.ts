import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateUserDTO {
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
  @IsArray()
  readonly wishlist: Schema.Types.ObjectId[];

  photoUrl: string;

  coverPhotoUrl: string;
}
