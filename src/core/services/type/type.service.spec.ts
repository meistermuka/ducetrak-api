import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeService } from './type.service';
import { NoTypeFoundError, TypeAlreadyDeleted } from './type.errors';
import { Type as TypeEntity } from '../../entities/type.entity';

const mockSimple = () => {
  const type = new TypeEntity();
  type.id = 2;
  type.name = 'one';
  type.deleted = false;
  return type;
};

const mockSimpleDeleted = () => {
  const type = new TypeEntity();
  type.id = 2;
  type.name = 'one';
  type.deleted = true;
  return type;
};

const createMock = jest.fn((mock: any) => mock);
const saveMock = jest.fn((mock: any) => mock);
const findOneMock = jest.fn((mock: any) => mock);

const MockRepository = jest.fn().mockImplementation(() => {
  return {
    create: createMock,
    save: saveMock,
    findOne: findOneMock,
  };
});

const mockRepository = new MockRepository();

describe('Type Service', () => {
  let typeService: TypeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeService,
        {
          provide: getRepositoryToken(TypeEntity),
          useValue: mockRepository
        },
      ],
    }).compile();

    typeService = module.get<TypeService>(TypeService);
  });

  it('should be defined', () => {
    expect(typeService).toBeDefined();
  });

  it('should find a type', async () => {
    mockRepository.findOne.mockReturnValue(mockSimple());
    await expect(typeService.getType(1)).resolves.toEqual(mockSimple());
  });

  it('should not find a type', async () => {
    mockRepository.findOne.mockReturnValue(mockSimpleDeleted());
    await expect(typeService.getType(1)).rejects.toThrow(new NoTypeFoundError());
  });

  it('should create a new type', async () => {
    mockRepository.save.mockReturnValue(mockSimple());
    await expect(typeService.postType({ name: 'one' })).resolves.toEqual(mockSimple());
  });

  it('should update a type', async () => {
    mockRepository.findOne.mockReturnValue(mockSimple());
    await expect(typeService.updateType(1, { name: 'foo' })).resolves.toEqual(mockSimple());
  });

  it('should fail to update type', async () => {
    mockRepository.findOne.mockReturnValue(mockSimpleDeleted());
    await expect(typeService.updateType(1, { name: 'two' })).rejects.toThrow(new NoTypeFoundError());
  });

  it('should delete a type', async () => {
    mockRepository.findOne.mockReturnValue(mockSimple());
    mockRepository.save.mockReturnValue(mockSimpleDeleted());
    await expect(typeService.deleteType('one')).resolves.toEqual(mockSimpleDeleted());
  });

  it('should not delete an already deleted type', async () => {
    mockRepository.findOne.mockReturnValue(mockSimpleDeleted());
    await expect(typeService.deleteType('one')).rejects.toThrow(new TypeAlreadyDeleted());
  });

});
