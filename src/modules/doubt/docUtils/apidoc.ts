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

const responses = {
  addDoubt,
  updateDoubt,
  deleteDoubt,
  addDoubtAnswer,
  updateDoubtAnswer,
  deleteDoubtAnswer,
};

export default responses;
