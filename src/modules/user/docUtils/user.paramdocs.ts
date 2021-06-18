import { ApiParamOptions } from '@nestjs/swagger';

export const userId: ApiParamOptions = {
  name: 'userId',
  type: String,
  description: 'User Id in the form of MongoId',
  example: '60ccf3758dc53371bd4d0154',
};
