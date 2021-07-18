import AnnouncementResponseBody from './announcement.responsedoc';
import { ApiResponseOptions } from '@nestjs/swagger';

const getAllAnnouncement: ApiResponseOptions = {
  description: 'Get all the courses available in the database',
  type: [AnnouncementResponseBody],
};

const getAnnouncement: ApiResponseOptions = {
  description: 'Get course by id from the database',
  type: AnnouncementResponseBody,
};

const addAnnouncement: ApiResponseOptions = {
  description: 'Add a course',
  type: AnnouncementResponseBody,
};

const updateAnnouncement: ApiResponseOptions = {
  description: 'Update a course',
  type: AnnouncementResponseBody,
};

const deleteAnnouncement: ApiResponseOptions = {
  description: 'Delete a course',
  type: AnnouncementResponseBody,
};

const responses = {
  getAllAnnouncement,
  getAnnouncement,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};

export default responses;
