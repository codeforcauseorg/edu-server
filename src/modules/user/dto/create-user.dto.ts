import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateUserDTO {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The first name of the student',
    default: '',
  })
  readonly first_name: string;

  @ApiProperty({
    type: String,
    description: 'The last name of the student',
    default: '',
  })
  readonly last_name: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The email of the student',
    default: '',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The phone number of the student',
    default: '',
  })
  readonly phone: string;

  @ApiProperty({
    type: String,
    description: 'The address of the student',
    default: '',
  })
  readonly address: string;

  @ApiProperty({
    type: String,
    description: 'The description of the student',
    default: '',
  })
  readonly description: string;

  @ApiProperty({
    type: Number,
    description: 'The score of the student',
  })
  readonly score: number;

  @ApiProperty({
    type: Boolean,
    description: 'The field to show of whether the students is Admin or not',
  })
  readonly isAdmin: boolean;

  @ApiProperty({
    type: [mongoose.Schema.Types.ObjectId],
    description: 'The list of wishlisted courses',
  })
  readonly wishlist: mongoose.Schema.Types.ObjectId[];

  @ApiProperty({
    type: String,
    description: 'The photo url',
  })
  photoUrl: string;

  @ApiProperty({
    type: String,
    description: 'The cover photo url',
  })
  coverPhotoUrl: string;
}
