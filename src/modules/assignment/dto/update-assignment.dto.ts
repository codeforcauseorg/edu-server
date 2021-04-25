import { IsNotEmpty } from 'class-validator';

export class UpdateAssignmentDTO {
  @IsNotEmpty()
  readonly name: string;
}
