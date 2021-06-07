import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateUserDTO {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The first name of the student',
    default: 'Tony',
  })
  readonly first_name: string;

  @ApiProperty({
    type: String,
    description: 'The last name of the student',
    default: 'Stark',
  })
  readonly last_name: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The email ID of the student',
    default: 'John@gmai.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The phone number of the student',
    default: 9000500000,
  })
  readonly phone: string;

  @ApiProperty({
    type: String,
    description: 'The address of the student',
    default: 'Mayur Vihar, Delhi',
  })
  readonly address: string;

  @ApiProperty({
    type: String,
    description: 'The short description of the student',
    default: 'Aspiring Software Developer',
  })
  readonly description: string;

  @ApiProperty({
    type: Number,
    description: 'The score of the student',
    default: 100,
  })
  readonly score: number;

  @ApiProperty({
    type: Boolean,
    description: 'The field to show whether the students is Admin or not',
    default: false,
  })
  readonly isAdmin: boolean;

  @ApiProperty({
    type: [mongoose.Schema.Types.ObjectId],
    description: 'The list of wishlisted courses',
    default: ['605e3fd9acc33583fb389aec'],
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
