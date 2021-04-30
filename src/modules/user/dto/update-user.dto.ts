export class UpdateUserDTO {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone: string;
  readonly photourl: string;
  readonly coverPhotoUrl: string;
  readonly address: string;
  readonly description: string;
  readonly score: number;
  readonly isAdmin: boolean;
  enrolled_courses: string[];
}
