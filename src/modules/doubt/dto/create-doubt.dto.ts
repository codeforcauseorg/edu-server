import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema } from 'mongoose';
import { TagType } from '../doubt-tag.enum';

export class CreateDoubtDto {
  @IsNotEmpty()
  @IsArray()
  @IsEnum(TagType, { each: true })
  tags: TagType[];

  @IsNotEmpty()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ type: Schema.Types.ObjectId })
  asked_by: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  request_mentor: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  is_resolved: boolean;
}
