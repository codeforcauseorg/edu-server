import { ApiParamOptions } from '@nestjs/swagger';

export const courseId: ApiParamOptions = {
  name: 'courseId',
  type: String,
  description: 'Course Id in the form of MongoId',
  example: '60ccf3758dc53371bd4d0154',
};

export const doubtId: ApiParamOptions = {
  name: 'doubtId',
  type: String,
  description: 'Doubt Id in the form of MongoId',
  example: '60ccf3758dc53371bd4d0154',
};

export const doubtAnswerId: ApiParamOptions = {
  name: 'doubtAnswerId',
  type: String,
  description: 'DoubtAnswer Id in the form of MongoId',
  example: '60ccf3758dc53371bd4d0154',
};
