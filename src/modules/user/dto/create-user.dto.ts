import { IsNotEmpty } from 'class-validator';

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

  @IsNotEmpty()
  readonly created_at: Date;

  readonly wishlist: string[];
}
