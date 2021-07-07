import { TagType } from '../course-tag.enum';
import { courseLevelType } from '../courseLevel.enum';

export interface Course {
  name: string;

  price: number;

  active: boolean;

  coupons: number;

  video_num: number;

  duration: string;

  assignments: string[];

  start_date: string;

  end_date: string;

  sharable_link: string;

  mentor: [];

  tags: TagType[];

  courseDetails: string;

  courseLevel: courseLevelType;

  courseThumbnail: string;

  courseTrailerUrl: string;

  _id: string;

  no_of_enrollments: number;
}
