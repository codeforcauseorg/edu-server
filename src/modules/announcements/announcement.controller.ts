import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service'; //eslint-disable-line 
import { CreateAnnouncementDTO } from './dto/create-announcement.dto'; //eslint-disable-line 
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAnnouncementDTO } from './dto/update-announcement.dto';
import responsedoc from './docUtils/apidoc';
import { announcementId } from './docUtils/announcement.paramdocs';

@ApiTags('Announcement')
@Controller('Announcement')
export class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}

  @Post()
  @ApiOperation({ summary: 'add an Announcement' })
  @ApiCreatedResponse(responsedoc.addAnnouncement)
  async addAnnouncement(@Body() CreateAnnouncementDTO: CreateAnnouncementDTO) {
    return await this.announcementService.addAnnouncement(
      CreateAnnouncementDTO,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve Announcements list' })
  @ApiOkResponse(responsedoc.getAllAnnouncement)
  async getAllAnnouncement() {
    return await this.announcementService.getAllAnnouncement();
  }

  @Get('/:announcementId')
  @ApiParam(announcementId)
  @ApiOperation({
    summary: 'Fetch a particular Announcement using ID',
  })
  @ApiOkResponse(responsedoc.getAnnouncement)
  async getAnnouncement(@Param('announcementId') announcementId: string) {
    return await this.announcementService.getAnnouncement(announcementId);
  }

  @Put('/:announcementId')
  @ApiParam(announcementId)
  @ApiOperation({ summary: 'update Announcement by Id' })
  @ApiOkResponse(responsedoc.updateAnnouncement)
  async updateAnnouncement(
    @Param('announcementId') announcementId: string,
    @Body() updateAnnouncementDTO: UpdateAnnouncementDTO,
  ) {
    return await this.announcementService.updateAnnouncement(
      announcementId,
      updateAnnouncementDTO,
    );
  }

  @Delete('/:announcementId')
  @ApiParam(announcementId)
  @ApiOperation({ summary: 'Delete an Announcement by Id' })
  @ApiOkResponse(responsedoc.deleteAnnouncement)
  async deleteAnnouncement(@Param('announcementId') announcementId: string) {
    return await this.announcementService.deleteAnnouncement(announcementId);
  }
}
