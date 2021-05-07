import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

const mockuser = {
  wishlist: [],
  enrolled_courses: [],
  isAdmin: false,
  score: 0,
  _id: '6079f573062890a5e2cad207',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  created_at: new Date(),
  phone: '9909999099',
  __v: 0,
  photoUrl: 'https://google.com/john',
  enrolledCourses: [],
  address: 'kolkol',
  description: 'string',
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUservalue = {
    getAllUser: jest.fn().mockResolvedValue([mockuser]),
    findUserById: jest.fn().mockResolvedValue([mockuser]),
    addUser: jest.fn().mockResolvedValue([mockuser]),
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
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('User', () => {
    it('should be fetched', async () => {
      jest.spyOn(service, 'getAllUser');
      await expect(controller.getAllUser()).resolves.toEqual([mockuser]);
    });

    it('should get by ID', async () => {
      jest.spyOn(service, 'getAllUser');

      // to check NOT NULL
      await expect(
        service.findUserById('6079f573062890a5e2cad207'),
      ).resolves.not.toEqual(null);

      const newUser: CreateUserDTO = mockuser;

      // to check that same user as expected results is fetched
      await expect(service.addUser(newUser)).resolves.toEqual([mockuser]);
    });
  });
});
