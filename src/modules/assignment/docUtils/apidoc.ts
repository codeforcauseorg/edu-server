import AssignmentResponseBody from './assignment.responsedoc';
import { ApiResponseOptions } from '@nestjs/swagger';

const addAssignment: ApiResponseOptions = {
  description: 'Add an assignment',
  type: AssignmentResponseBody,
};

const updateAssignment: ApiResponseOptions = {
  description: 'Update an assignment',
  type: AssignmentResponseBody,
};

const deleteAssignment: ApiResponseOptions = {
  description: 'Delete an assignment',
  type: AssignmentResponseBody,
};

const responses = {
  addAssignment,
  updateAssignment,
  deleteAssignment,
};

export default responses;
