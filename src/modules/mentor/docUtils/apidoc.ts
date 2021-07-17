import MentorResponseBody from './mentor.responsedoc';
import { ApiResponseOptions } from '@nestjs/swagger';

const addMentor: ApiResponseOptions = {
  description: 'Create Mentor with provided values',
  type: MentorResponseBody,
};

const getAllMentors: ApiResponseOptions = {
  description: 'Get all the Mentors available in the database',
  type: [MentorResponseBody],
};

const updateMentor: ApiResponseOptions = {
  description: 'Update Mentor',
  type: MentorResponseBody,
};

const getMentor: ApiResponseOptions = {
  description: 'retrieve a mentor by mentorId',
  type: MentorResponseBody,
};

const deleteMentor: ApiResponseOptions = {
  description: 'Delete Mentor',
  type: MentorResponseBody,
};

const responses = {
  addMentor,
  getAllMentors,
  getMentor,
  updateMentor,
  deleteMentor,
};

export default responses;
