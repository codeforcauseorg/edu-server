import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {},
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

    service = module.resolve<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Testing userService after mock', () => {
    //const id = new mongoose.Schema.Types.ObjectId('60bca010d17d463dd09baf9b');
    it('testing get all method', () => {
      expect(typeof service.getAllUser).not.toEqual(null);
    });
  });
});
