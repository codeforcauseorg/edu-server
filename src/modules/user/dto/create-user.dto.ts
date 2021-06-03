import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name of the student',
    default: '',
  })
  readonly first_name: string;

  @ApiProperty({
    type: String,
    description: 'The name of the student',
    default: '',
  })
  readonly last_name: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;

  readonly address: string;

  readonly description: string;

  readonly score: number;
  readonly isAdmin: boolean;

  readonly wishlist: string[];
}
