import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { createMock } from '@golevelup/nestjs-testing';
import { Model, Mongoose, Query } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './interfaces/user.interface';
import { UserDoc } from './interfaces/user-document.interface';
import { Document, Schema as SchemaTypes } from 'mongoose';
import { UpdateUserDTO } from './dto/update-user.dto';

const mockUser = (
  wishlist: [],
  isAdmin: false,
  _id: '6079f573062890a5e2cad207',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  phone: '9909999099',
  photoUrl: 'https://google.com/john',
  address: 'Block C Amsterdam',
  description: 'Aspiring Software Developer',
  score: 0,
  coverPhotoUrl: 'https://google.com/john',
): User => ({
  wishlist,
  isAdmin,
  _id,
  first_name,
  last_name,
  email,
  phone,
  photoUrl,
  address,
  description,
  score,
  coverPhotoUrl,
});

const mockUserDoc = (mock?: Partial<User>): Partial<UserDoc> => ({
  wishlist: mock?.wishlist || [],
  isAdmin: mock?.isAdmin || false,
  _id: mock?._id || '6079f573062890a5e2cad207',
  first_name: mock?.first_name || 'John',
  last_name: mock?.last_name || 'Doe',
  email: mock?.email || 'john@example.com',
  phone: mock?.phone || '9909999099',
  photoUrl: mock?.photoUrl || 'https://google.com/john',
  address: mock?.address || 'Block C Amsterdam',
  description: mock?.description || 'Aspiring Software Developer',
  score: mock?.score || 0,
  coverPhotoUrl: mock?.coverPhotoUrl || 'https://google.com/john',
});

const userArray = [
  mockUser(
    [],
    false,
    '6079f573062890a5e2cad207',
    'John',
    'Doe',
    'john@example.com',
    '9909999099',
    'https://google.com/john',
    'Block C Amsterdam',
    'Aspiring Software Developer',
    0,
    'https://google.com/john',
  ),
];

const userDocArray = [
  mockUserDoc({
    wishlist: [],
    isAdmin: false,
    _id: '6079f573062890a5e2cad207',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '9909999099',
    photoUrl: 'https://google.com/john',
    address: 'Block C Amsterdam',
    description: 'Aspiring Software Developer',
    score: 0,
    coverPhotoUrl: 'https://google.com/john',
  }),
];

describe('UserService', () => {
  let service: UserService;
  let model: Model<UserDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken('Course'),
          useValue: {},
        },
        {
          provide: getModelToken('Enrolled'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<UserDoc>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing userService after mock', () => {
    //const id = new mongoose.Schema.Types.ObjectId('60bca010d17d463dd09baf9b');

    it('should return all users', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(userDocArray),
      } as any);
      const users = await service.getAllUser();
      // console.log(users);
      expect(users).toEqual(userArray);
    });

    it('should getOne user by id', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<Query<UserDoc, UserDoc>>({
          exec: jest.fn().mockResolvedValueOnce(
            mockUserDoc({
              wishlist: [],
              isAdmin: false,
              _id: '6079f573062890a5e2cad207',
              first_name: 'John',
              last_name: 'Doe',
              email: 'john@example.com',
              phone: '9909999099',
              photoUrl: 'https://google.com/john',
              address: 'Block C Amsterdam',
              description: 'Aspiring Software Developer',
              score: 0,
              coverPhotoUrl: 'https://google.com/john',
            }),
          ),
        }),
      );
      const findMockUser = mockUser(
        [],
        false,
        '6079f573062890a5e2cad207',
        'John',
        'Doe',
        'john@example.com',
        '9909999099',
        'https://google.com/john',
        'Block C Amsterdam',
        'Aspiring Software Developer',
        0,
        'https://google.com/john',
      );
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const foundUser = await service.findUserById(id);
      expect(foundUser).toEqual(findMockUser);
    });

    /*it('should insert a new user', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          wishlist: [],
          isAdmin: false,
          _id: '6079f573062890a5e2cad207',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          phone: '9909999099',
          photoUrl: 'https://google.com/john',
          address: 'Block C Amsterdam',
          description: 'Aspiring Software Developer',
        }),
      );
      const newUser = await service.addUser({
        isAdmin: false,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '9909999099',
        photoUrl: 'https://google.com/john',
        address: 'Block C Amsterdam',
        description: 'Aspiring Software Developer',
      });
      expect(newUser).toEqual(
        mockUser(
          [],
          false,
          '6079f573062890a5e2cad207',
          'John',
          'Doe',
          'john@example.com',
          '9909999099',
          'https://google.com/john',
          'Block C Amsterdam',
          'Aspiring Software Developer',
        ),
      );
    });*/

    it.skip('should update a User successfully', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce(
        createMock<Query<UserDoc, UserDoc>>({
          exec: jest.fn().mockResolvedValueOnce({
            wishlist: [],
            isAdmin: false,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            phone: '9909999099',
            photoUrl: 'https://google.com/john',
            address: 'Block C Amsterdam',
            description: 'Aspiring Software Developer',
            score: 0,
            coverPhotoUrl: 'https://google.com/john',
          }),
        }),
      );
      const id = new mongoose.Schema.Types.ObjectId('22', 0, 'rtex');
      const updateUserdto: UpdateUserDTO = {
        wishlist: [],
        isAdmin: false,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '9909999099',
        photoUrl: 'https://google.com/john',
        address: 'Block C Amsterdam',
        description: 'Aspiring Software Developer',
        score: 0,
        coverPhotoUrl: 'https://google.com/john',
      };
      const updatedUser = await service.updateUser(id, updateUserdto);
      expect(updatedUser).toEqual(
        mockUser(
          [],
          false,
          '6079f573062890a5e2cad207',
          'John',
          'Doe',
          'john@example.com',
          '9909999099',
          'https://google.com/john',
          'Block C Amsterdam',
          'Aspiring Software Developer',
          0,
          'https://google.com/john',
        ),
      );
    });
  });
});
