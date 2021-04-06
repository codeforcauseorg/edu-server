import { IsNotEmpty } from 'class-validator';

export class CreateChatDTO {
  @IsNotEmpty()
  readonly sender: string;

  readonly original_sender: string;
  readonly chats: string;
}
