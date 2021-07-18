import CourseResponseBody, {
  ReviewResponseBody,
  ScheduleResponseBody,
} from './course.responsedoc';
import { ApiResponseOptions } from '@nestjs/swagger';

const getAllCourses: ApiResponseOptions = {
  description: 'Get all the courses available in the database',
  type: [CourseResponseBody],
};

const getAllQueryCourses: ApiResponseOptions = {
  description:
    'Get all the courses whose name feild matches the query parameter',
  type: [CourseResponseBody],
};

const getSelectedCourses: ApiResponseOptions = {
  description: 'Get course by id from the database',
  type: CourseResponseBody,
};

const addCourse: ApiResponseOptions = {
  description: 'Add a course',
  type: CourseResponseBody,
};

const updateCourse: ApiResponseOptions = {
  description: 'Update a course',
  type: CourseResponseBody,
};

const deleteCourse: ApiResponseOptions = {
  description: 'Delete a course',
  type: CourseResponseBody,
};

const addScheduleCourse: ApiResponseOptions = {
  description: 'Add a schedule for the course',
  type: ScheduleResponseBody,
};

const updateScheduleCourse: ApiResponseOptions = {
  description: 'update a schedule for the course',
  type: ScheduleResponseBody,
};

const deleteScheduleCourse: ApiResponseOptions = {
  description: 'Delete schedule for the course',
  type: ScheduleResponseBody,
};

const addReview: ApiResponseOptions = {
  description: 'Add a review for the course',
  type: ReviewResponseBody,
};

const updateReview: ApiResponseOptions = {
  description: 'update a review for the course',
  type: ReviewResponseBody,
};
const deleteReview: ApiResponseOptions = {
  description: 'Delete review for the course',
  type: ReviewResponseBody,
};

const responses = {
  getAllCourses,
  getSelectedCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  addScheduleCourse,
  updateScheduleCourse,
  deleteScheduleCourse,
  addReview,
  updateReview,
  deleteReview,
  getAllQueryCourses,
};

export default responses;
