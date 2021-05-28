import { IsNotEmpty } from 'class-validator';

export class CreateAssignmentDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly link: string;

  readonly submit_by: number;

  @IsNotEmpty()
  readonly created_at: Date;
}
