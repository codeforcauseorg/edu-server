import { IsNotEmpty } from 'class-validator';
import { User } from '../../../schemas/user.schema';
import { Room } from '../../../schemas/room.schema';

export class CreateChatDTO {
  @IsNotEmpty()
  readonly sender: string;
  readonly message: string;
  readonly owner: User;
  readonly room: Room | string;
}
