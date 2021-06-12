import { ApiProperty } from '@nestjs/swagger';

export class UserResponseBody {
  @ApiProperty({ required: true, example: '605e3fd9acc33583fb389aec' })
  _id: string;

  @ApiProperty({ required: true, example: 'John' })
  first_name: string;

  @ApiProperty({ required: true, example: 'Stark' })
  last_name: string;

  @ApiProperty({ required: true, example: 'John@gmai.com' })
  email: string;

  @ApiProperty({ required: true, example: '+919999999999' })
  phone: string;

  @ApiProperty({ required: true, example: 'A-88, Mayur Vihar, Delhi' })
  address: string;

  @ApiProperty({ required: true, example: 'I am a great learner' })
  description: string;

  @ApiProperty({ required: false, example: 80 })
  score: number;

  @ApiProperty({ required: true, example: true })
  isAdmin: boolean;

  @ApiProperty({ required: false, example: ['DSA', 'Python'] })
  wishlist: string[];
}
