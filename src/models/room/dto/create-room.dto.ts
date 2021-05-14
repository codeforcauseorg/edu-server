import { User } from '../../../schemas/user.schema';

export class CreateRoomeDto {
  readonly id: string[];

  readonly name: User;

  readonly Chat: boolean;

  readonly connectedUsers: User;
}
