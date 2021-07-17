import { IsString } from 'class-validator';

export class GetCourseFilterDto {
  /**
   * The query string
   * @example 'Python DSA'
   */
  @IsString()
  Query: string;
}
