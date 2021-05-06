import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockuser = {
  wishlist: [],
  enrolled_courses: [],
  isAdmin: false,
  score: 0,
  _id: '6079f573062890a5e2cad207',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  created_at: '2021-03-27T14:05:28.000Z',
  phone: '9909999099',
  __v: 0,
  photoUrl: 'https://google.com/john',
  enrolledCourses: [],
};

describe('UserController', () => {
  let controller: UserController;
  // let service: UserService;

  const mockUservalue = {
    getAllUser: jest.fn().mockResolvedValue([mockuser]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUservalue,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    // service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('User', () => {
    it('should be created', async () => {
      await expect(controller.getAllUser()).resolves.toEqual([mockuser]);
    });
  });
});
