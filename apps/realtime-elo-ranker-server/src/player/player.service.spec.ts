import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';

describe('PlayerService', () => {
  let service: PlayerService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        { provide: EventEmitter2, useValue: { emit: jest.fn() } }, // Mock EventEmitter2
        { provide: getRepositoryToken(Player), useValue: mockRepository }, // Mock TypeORM Repository
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<Player>>(
      getRepositoryToken(Player),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of players', async () => {
      const result = [{ id: 'John Doe', rank: 1000 }];
      jest.spyOn(playerRepository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a player', async () => {
      const result = { id: 'John Doe', rank: 1000 };
      jest.spyOn(playerRepository, 'findOneBy').mockResolvedValue(result);

      expect(await service.findOne('John Doe')).toBe(result);
    });
  });

  describe('createPlayer', () => {
    it('should create a player', async () => {
      const player = { id: 'John Doe', rank: 1000 };
      jest.spyOn(playerRepository, 'save').mockResolvedValue(player);

      expect(await service.createPlayer(player)).toBe(player);
    });
  });

  describe('remove', () => {
    it('should remove a player', async () => {
      jest
        .spyOn(playerRepository, 'delete')
        .mockResolvedValue({} as DeleteResult);

      expect(await service.remove('John Doe')).toBe(undefined);
    });
  });

  describe('updateRank', () => {
    it('should update a player rank', async () => {
      jest
        .spyOn(playerRepository, 'update')
        .mockResolvedValue({} as UpdateResult);

      expect(await service.updateRank('John Doe', 1000)).toBe(undefined);
    });
  });
});
