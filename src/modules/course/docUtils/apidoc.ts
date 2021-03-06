import CourseResponseBody, {
  ReviewResponseBody,
  ScheduleResponseBody,
  LectureResponseBody,
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

const addLecture: ApiResponseOptions = {
  description: 'Add a Lecture for the course',
  type: LectureResponseBody,
};

const updateLecture: ApiResponseOptions = {
  description: 'update a Lecture for the course',
  type: LectureResponseBody,
};
const deleteLecture: ApiResponseOptions = {
  description: 'Delete Lecture for the course',
  type: LectureResponseBody,
};

const addMentorToCourse: ApiResponseOptions = {
  description: 'Add mentor to the course',
  type: CourseResponseBody,
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
  addLecture,
  updateLecture,
  deleteLecture,
  addMentorToCourse,
};

export default responses;
