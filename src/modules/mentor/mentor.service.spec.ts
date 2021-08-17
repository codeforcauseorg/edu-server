import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/nestjs-testing';
import { MentorService } from './mentor.service';
import { Mentor, MentorDocument as MentorDoc } from './schema/mentor.schema';
import { Model, Query } from 'mongoose';
import * as mongoose from 'mongoose';
import { UpdateMentorDTO } from './dto/update-mentor.dto';

const mockMentor = (
  name = 'Abhishek Kumar',
  email = 'Abhishsek@gmail.com',
  courses = [],
  number_of_students = 100000,
  mentorPhoto = 'https://codeforcause.org/static/images',
  aboutMe = 'I am a full stack developer',
  techStack = ['MERN', 'Java', 'Python'],
): Mentor => ({
  name,
  email,
  courses,
  number_of_students,
  mentorPhoto,
  aboutMe,
  techStack,
});

const mockMentorDoc = (mock?: Partial<Mentor>, _id?): Partial<MentorDoc> => ({
  _id: _id || '6079f573062890a5e2cad207',
  name: mock?.name || 'Abhishek Kumar',
  email: mock?.email || 'Abhishsek@gmail.com',
  courses: mock?.courses || [],
  number_of_students: mock?.number_of_students || 100000,
  mentorPhoto: mock?.mentorPhoto || 'https://codeforcause.org/static/images',
  aboutMe: mock?.aboutMe || 'I am a full stack developer',
  techStack: mock?.techStack || ['MERN', 'Java', 'Python'],
});

describe('MentorService', () => {
  let service: MentorService;
  let model: Model<MentorDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MentorService,
        {
          provide: getModelToken('Mentor'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockMentor),
            constructor: jest.fn().mockResolvedValue(mockMentor),
            find: jest.fn(),
            populate: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            findByIdAndUpdate: jest.fn(),
          },
        },
        {
          provide: getModelToken('Course'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MentorService>(MentorService);
    model = module.get<Model<MentorDoc>>(getModelToken('Mentor'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  beforeEach(() => {
    jest.setTimeout(10000);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing MentorService after mock', () => {
    const _id = '60bca010d17d463dd09baf9b';
    const mentorDocArray = [mockMentorDoc({}, _id)];

    // Test for testing the service for returning all mentors
    it('should return all mentors', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mentorDocArray),
      } as any);
      // console.log(mentorDocArray);
      const mentors = await service.getAllMentor();
      // console.log(mentors);
      const mentorArray = [{ ...mockMentor(), _id }];
      expect(mentors).toEqual(mentorArray);
    });

    // Test for testing the service for finding a Mentor by id
    it.skip('should getOne Mentor by id', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<Query<MentorDoc, MentorDoc>>({
          exec: jest.fn().mockResolvedValueOnce(mockMentorDoc()),
        }),
      );
      const findMockMentor = mockMentor();
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const foundMentor = await service.findMentorById(id);
      expect(foundMentor).toEqual(findMockMentor);
    });

    // Test for testing the service for updating a Mentor
    it('should update a Mentor successfully', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce(
        createMock<Query<MentorDoc, MentorDoc>>({
          exec: jest.fn().mockResolvedValueOnce({
            _id: '6079f573062890a5e2cad207',
            name: 'Abhishek Kumar',
            email: 'Abhishsek@gmail.com',
            courses: [],
            number_of_students: 100000,
            mentorPhoto: 'https://codeforcause.org/static/images',
            aboutMe: 'I am a full stack developer',
            techStack: ['MERN', 'Java', 'Python'],
          }),
        }),
      );
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const updatedMentordto: UpdateMentorDTO = {
        name: 'Abhishek Kumar',
        email: 'Abhishsek@gmail.com',
        number_of_students: 100000,
        mentorPhoto: 'https://codeforcause.org/static/images',
        aboutMe: 'I am a full stack developer',
        techStack: ['MERN', 'Java', 'Python'],
      };
      const updatedMentor = await service.updateMentor(id, updatedMentordto);
      const _id = '6079f573062890a5e2cad207';
      const updatedMentorFinal = { ...mockMentor(), ...updatedMentor, _id };
      expect(updatedMentor).toEqual(updatedMentorFinal);
    });
  });
});
