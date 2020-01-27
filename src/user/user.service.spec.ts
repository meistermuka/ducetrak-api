import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { ConfigService } from '../core/services';

import { User as UserEntity } from './user.entity';
import { Role as RoleEntity } from '../core/entities/role.entity';

import { NoUserFoundError } from '../shared';

const createMock = jest.fn((mock: any) => mock);
const saveMock = jest.fn((mock: any) => mock);
const findMock = jest.fn((mock: any) => mock);
const findOneMock = jest.fn((mock: any) => mock);

const MockRepository = jest.fn().mockImplementation(() => {
  return {
    create: createMock,
    save: saveMock,
    find: findMock,
    findOne: findOneMock,
  };
});

const mockRepository = new MockRepository();

const createdDate = new Date().toISOString();

const mockSimpleUser = (deleted = false) => {
  const user = new UserEntity({
    id: 1,
    username: 'username',
    firstName: 'first',
    lastName: 'last',
    email: 'e.mail@web.net',
    createdDate: createdDate,
    deleted,
  });

  return user;
}

describe('User Service', () => {
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: ConfigService,
          useValue: new ConfigService(`./env/${process.env.NODE_ENV || 'development'}.env`),
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should get one user', async () => {
    mockRepository.findOne.mockReturnValue(mockSimpleUser());
    await expect(userService.getUser('user')).resolves.toEqual(mockSimpleUser());
  });

  it('should not get one user', async () => {
    mockRepository.findOne.mockReturnValue(mockSimpleUser(true));
    await expect(userService.getUser('user')).rejects.toThrow(new NoUserFoundError());
  });
});
