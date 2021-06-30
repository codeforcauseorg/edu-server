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
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAnnouncementDTO } from './dto/update-announcement.dto';
import responsedoc from './docUtils/apidoc';
import { AnnouncementId } from './docUtils/announcement.paramdocs';

class AnnouncementResponseBody {
  @ApiProperty({ required: true, example: '605e3fd9acc33583fb389aec' })
  id: string;

  @ApiProperty({ required: true, example: 'Noob' })
  name: string;

  @ApiProperty({ required: true, example: 'Coder' })
  link: string;

  @ApiProperty({ required: true, example: 'noobcoder@gmai.com' })
  submit_by: string;
}

@ApiTags('Announcement')
@Controller('Announcement')
export class AnnouncementController {
  constructor(private AnnouncementService: AnnouncementService) {}

  // add a Announcement
  @Post()
  @ApiCreatedResponse(responsedoc.addAnnouncement)
  async addAnnouncement(@Body() CreateAnnouncementDTO: CreateAnnouncementDTO) {
    return await this.AnnouncementService.addAnnouncement(
      CreateAnnouncementDTO,
    );
  }

  // Retrieve Announcements list
  @Get()
  @ApiOkResponse(responsedoc.getAllAnnouncement)
  async getAllAnnouncement() {
    return await this.AnnouncementService.getAllAnnouncement();
  }

  // Fetch a particular Announcement using ID
  @Get('/:AnnouncementId')
  @ApiParam(AnnouncementId)
  @ApiOkResponse({ type: AnnouncementResponseBody })
  async getAnnouncement(@Param('AnnouncementId') AnnouncementId: string) {
    return await this.AnnouncementService.getAnnouncement(AnnouncementId);
  }

  @Put('/:AnnouncementId')
  @ApiParam(AnnouncementId)
  @ApiOkResponse(responsedoc.updateAnnouncement)
  async updateAnnouncement(
    @Param('AnnouncementId') AnnouncementId: string,
    @Body() updateAnnouncementDTO: UpdateAnnouncementDTO,
  ) {
    return await this.AnnouncementService.updateAnnouncement(
      AnnouncementId,
      updateAnnouncementDTO,
    );
  }

  // Delete a Announcement
  @Delete('/:AnnouncementId')
  @ApiParam(AnnouncementId)
  @ApiOkResponse(responsedoc.deleteAnnouncement)
  async deleteAnnouncement(@Param('AnnouncementId') AnnouncementId: string) {
    return await this.AnnouncementService.deleteAnnouncement(AnnouncementId);
  }
}
