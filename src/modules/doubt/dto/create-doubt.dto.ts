import { IsBoolean, IsMongoId, IsOptional } from "class-validator";
import { User } from "../../../schemas/user.schema";

export class CreateDoubtDto {
  readonly tags: [];

  @IsMongoId()
  readonly asked_by: User;

  readonly answers: [];

  @IsBoolean()
  @IsOptional()
  readonly request_mentor: boolean;
}