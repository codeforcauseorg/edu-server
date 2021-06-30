import { ApiParamOptions } from '@nestjs/swagger';

export const announcementId: ApiParamOptions = {
  name: 'announcementId',
  type: String,
  description: 'Announcement Id in the form of MongoId',
  example: '60ccf3758dc53371bd4d0154',
};
