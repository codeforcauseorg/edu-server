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

  readonly enrolled_courses: string[];

  readonly referral_code: string;

  readonly referrals: string[]; //Will contain userIDs of users referred by this user
  readonly wishlist: string[];
}
