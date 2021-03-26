export class CourseDTO {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly start_date: Date;
  readonly end_date: Date;
  readonly duration: string;
  readonly active: boolean;
  readonly coupons: number;
  readonly student_num: number;
  readonly video_num: number;
}