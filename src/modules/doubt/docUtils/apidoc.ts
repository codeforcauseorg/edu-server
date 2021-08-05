import DoubtResponseBody, {
  DoubtAnswerResponseBody,
} from './doubt.responsedoc';
import { ApiResponseOptions } from '@nestjs/swagger';

const addDoubt: ApiResponseOptions = {
  description: 'Add a doubt',
  type: DoubtResponseBody,
};

const updateDoubt: ApiResponseOptions = {
  description: 'Update a doubt',
  type: DoubtResponseBody,
};

const deleteDoubt: ApiResponseOptions = {
  description: 'Delete a doubt',
  type: DoubtResponseBody,
};

const addDoubtAnswer: ApiResponseOptions = {
  description: 'Add a doubt Answer',
  type: DoubtAnswerResponseBody,
};

const updateDoubtAnswer: ApiResponseOptions = {
  description: 'Update a doubt Answer',
  type: DoubtAnswerResponseBody,
};

const deleteDoubtAnswer: ApiResponseOptions = {
  description: 'Delete a doubt Answer',
  type: DoubtAnswerResponseBody,
};

const getDoubtsForSelectedCourse: ApiResponseOptions = {
  description: 'Get doubts for courses',
  type: [DoubtResponseBody],
};

const getAllDoubts: ApiResponseOptions = {
  description: 'Retrieve doubts list',
  type: [DoubtResponseBody],
};

const getDoubtById: ApiResponseOptions = {
  description: 'get doubt by Id',
  type: DoubtResponseBody,
};

const responses = {
  addDoubt,
  updateDoubt,
  deleteDoubt,
  addDoubtAnswer,
  updateDoubtAnswer,
  deleteDoubtAnswer,
  getDoubtsForSelectedCourse,
  getAllDoubts,
  getDoubtById,
};

export default responses;
