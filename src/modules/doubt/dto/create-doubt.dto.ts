import { IsNotEmpty } from 'class-validator';

export class DoubtDTO {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly asked_by: string;

  readonly answers: string[];

  @IsNotEmpty()
  readonly is_resolved: boolean;

  @IsNotEmpty()
  request_mentor: boolean;
}
