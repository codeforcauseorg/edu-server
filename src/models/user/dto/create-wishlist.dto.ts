import { IsArray, IsDateString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateWishListDto {
  @IsNotEmpty()
  readonly_id: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsDateString()
  readonly start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsNotEmpty()
  readonly duration: string;

  @IsNotEmpty()
  readonly active: boolean;

  readonly video_num: number;

  @IsNotEmpty()
  @IsUrl()
  readonly sharable_link: string;

  @IsNotEmpty()
  @IsArray()
  mentor: [];
}
