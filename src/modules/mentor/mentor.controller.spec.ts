import { Test, TestingModule } from '@nestjs/testing';
import { MentorController } from './mentor.controller';
import { MentorService } from './mentor.service';
import { CreateMentorDTO } from './dto/create-mentor.dto';
import { UpdateMentorDTO } from './dto/update-mentor.dto';
import * as mongoose from 'mongoose';
const mockMentor = {
  id: '60c5eafba5940a4964d5ea96',
  name: ' John Doe ',
  email: ' johnDoe@gmail.com ',
  courses: [],
  number_of_students: 500,
};

describe('MentorController', () => {
  let controller: MentorController;
  let service: MentorService;

  const mockMentorvalue = {
    getAllMentor: jest.fn().mockResolvedValue([mockMentor]),
    findMentorById: jest
      .fn()
      .mockImplementation((id: string) => ({ ...mockMentor, id })),
    editMentor: jest.fn().mockImplementation((uid, body) => ({
      ...mockMentor,
      id: uid,
      ...body,
    })),
    addMentor: jest.fn().mockResolvedValue([mockMentor]),
    updateMentor: jest.fn().mockResolvedValue([mockMentor]),
    deleteMentor: jest.fn().mockResolvedValue([mockMentor]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentorController],
      providers: [
        {
          provide: MentorService,
          useValue: mockMentorvalue,
        },
      ],
    }).compile();

    controller = module.get<MentorController>(MentorController);
    service = module.get<MentorService>(MentorService);
  });

  // check if controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Mentor', () => {
    // Mentor creation
    it('Mentor should be created', async () => {
      await expect(controller.getAllMentor()).resolves.toEqual([mockMentor]);
    });

    // Mentor found by id
    it('Mentor should be found by ID', async () => {
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      await expect(controller.getMentor(id)).resolves.toEqual({
        ...mockMentor,
        id,
      });
      expect(service.findMentorById).toHaveBeenCalledWith(id);
    });

    // retrieved value not equal as id if different/does not exist
    it('Mentor should not be equal to the returned value if  ID does not exist', async () => {
      const id = new mongoose.Schema.Types.ObjectId('18', 0, 'riep');
      const idFix = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      await expect(controller.getMentor(id)).resolves.not.toEqual({
        ...mockMentor,
        idFix,
      });
      expect(service.findMentorById).toHaveBeenCalledWith(id);
    });

    // Mentor should be created
    it('Mentor should be created', async () => {
      const dto: CreateMentorDTO = {
        name: ' John Doe ',
        email: ' johnDoe@gmail.com ',
        number_of_students: 500,
      };
      await expect(controller.addMentor(dto)).resolves.not.toBeNull();
      expect(service.addMentor).toHaveBeenCalledWith(dto);
    });

    // Mentor should be updated
    it('Mentor should be updated', async () => {
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const dto: UpdateMentorDTO = {
        name: ' John Doe ',
        email: ' johnDoe@gmail.com ',
        number_of_students: 500,
      };
      await expect(controller.updateMentor(id, dto)).resolves.toEqual([
        {
          ...mockMentor,
          ...dto,
        },
      ]);
      expect(service.updateMentor).toHaveBeenCalledWith(id, dto);
    });

    // retrieved value not equal as id if different/does not exist
    it('Mentor should not be updated and be equal to the returned value if  ID does not exist', async () => {
      const id = new mongoose.Schema.Types.ObjectId('18', 0, 'riep');
      const idFix = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const dto: UpdateMentorDTO = {
        name: ' John Doe ',
        email: ' johnDoe@gmail.com ',
        number_of_students: 500,
      };
      await expect(controller.updateMentor(id, dto)).resolves.not.toEqual({
        ...mockMentor,
        idFix,
      });
      expect(service.updateMentor).toHaveBeenCalledWith(id, dto);
    });

    //  Mentor shpuld be deleted
    it('Mentor should be deleted', async () => {
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      await expect(controller.deleteMentor(id)).resolves.toEqual([
        {
          ...mockMentor,
        },
      ]);
      expect(service.deleteMentor).toHaveBeenCalledWith(id);
    });
  });

  // retrieved value not equal as id if different/does not exist
  it('Mentor should not be deleted and be equal to the returned value if  ID does not exist', async () => {
    const id = new mongoose.Schema.Types.ObjectId('18', 0, 'riep');
    const idFix = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
    await expect(controller.deleteMentor(id)).resolves.not.toEqual({
      ...mockMentor,
      idFix,
    });
    expect(service.deleteMentor).toHaveBeenCalledWith(id);
  });
});
