import UserResponseBody, {
  EnrolledCourseResponseBody,
  getAllGamifiedResponseBody,
} from './user.responsedoc';
import { ApiResponseOptions } from '@nestjs/swagger';

const addUser: ApiResponseOptions = {
  description: 'Create user with provided values',
  type: UserResponseBody,
};

const getAllUser: ApiResponseOptions = {
  description: 'Get all the users available in the database',
  type: [UserResponseBody],
};

const getEnrolledCourses: ApiResponseOptions = {
  description:
    'Get all the enrolled courses, returns all the ids of enrolled courses',
  type: [String],
};

const getEnrolledCoursesById: ApiResponseOptions = {
  description: 'Get details of enrolled course',
  type: EnrolledCourseResponseBody,
};

const addEnrolledCourses: ApiResponseOptions = {
  description: 'Add Enrolled courses for the user',
  type: [String],
};

const updateEnrolledCourses: ApiResponseOptions = {
  description: 'Update Enrolled Courses',
  type: EnrolledCourseResponseBody,
};

const getWishlist: ApiResponseOptions = {
  description: 'Get all the Wishlisted Courses',
  type: [String],
};

const addWishlist: ApiResponseOptions = {
  description: 'Add Wishlist Course',
  type: UserResponseBody,
};

const deleteWishList: ApiResponseOptions = {
  description: 'Delete Wishlist Course',
  type: UserResponseBody,
};

const getCartList: ApiResponseOptions = {
  description: 'Get all the Courses in the cartList',
  type: [String],
};

const addCartList: ApiResponseOptions = {
  description: 'Add Course to cartList',
  type: UserResponseBody,
};

const deleteCartList: ApiResponseOptions = {
  description: 'Delete course from cartList',
  type: UserResponseBody,
};

const getAllGamified: ApiResponseOptions = {
  description: 'Delete course from cartList',
  type: getAllGamifiedResponseBody,
};

const responses = {
  addUser,
  getAllUser,
  getEnrolledCourses,
  getEnrolledCoursesById,
  addEnrolledCourses,
  updateEnrolledCourses,
  getWishlist,
  addWishlist,
  deleteWishList,
  addCartList,
  deleteCartList,
  getCartList,
  getAllGamified,
};

export default responses;
