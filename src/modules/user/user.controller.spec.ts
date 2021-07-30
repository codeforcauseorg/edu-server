import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as mongoose from 'mongoose';
const mockuser = {
  wishlist: [],
  enrolled_courses: [],
  role: 'Student',
  score: 0,
  _id: '6079f573062890a5e2cad207',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  created_at: '2021-03-27T14:05:28.000Z',
  phone: '9909999099',
  __v: 0,
  photoUrl: 'https://google.com/john',
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUservalue = {
    getAllUser: jest.fn().mockResolvedValue([mockuser]),
    findUserById: jest
      .fn()
      .mockImplementation((_id: string) => ({ ...mockuser, _id })),
    updateUser: jest.fn().mockImplementation((uid, body) => ({
      ...mockuser,
      _id: uid,
      ...body,
    })),
    addUser: jest.fn().mockImplementation((body) => ({ ...mockuser, ...body })),
    // deleteUser: jest.fn().mockResolvedValue([mockuser]),
    // getEnrolledCourses: jest.fn().mockResolvedValue([mockuser]),
    // addCourse: jest.fn().mockResolvedValue([mockuser]),
    // getWishList: jest.fn().mockResolvedValue([mockuser]),
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
    it('should be created', async () => {
      const dto: CreateUserDTO = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '9909999099',
        photoUrl: 'https://google.com/john',
        score: 0,
      };
      await expect(controller.addUser('x', dto)).resolves.toEqual({
        _id: expect.any(String),
        '0': 'x',
        role: 'Student',
        ...mockuser,
      });
    });

    it('should find all users', async () => {
      await expect(controller.getAllUser()).resolves.toEqual([mockuser]);
    });

    it('should be found be ID', async () => {
      const _id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      await expect(controller.getUser(_id)).resolves.toEqual({
        role: 'Student',
        ...mockuser,
        _id,
      });
      expect(service.findUserById).toHaveBeenCalledWith(_id);
    });

    it('should be found be with another ID', async () => {
      const _id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      await expect(controller.getUser(_id)).resolves.toEqual({
        role: 'Student',
        ...mockuser,
        _id,
      });
      expect(service.findUserById).toHaveBeenCalledWith(_id);
    });

    it('should be updated', async () => {
      const _id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const dto: UpdateUserDTO = {
        first_name: 'New Name',
        last_name: 'New',
        phone: '',
        wishlist: [],
        address: '',
        description: '',
        score: 1,
        coverPhotoUrl: '',
        photoUrl: '',
      };
      const email = 'john@example.com';
      await expect(controller.updateUser(_id, dto)).resolves.toEqual({
        _id,
        email,
        role: 'Student',
        ...dto,
        wishlist: [],
        enrolled_courses: [],
        created_at: '2021-03-27T14:05:28.000Z',
        __v: 0,
      });
    });
  });
});
