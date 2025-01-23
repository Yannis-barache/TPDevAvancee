import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}
  findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  findOne(id: number): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id });
  }

  create(user: Player): Promise<Player> {
    if (user === null || user === undefined) {
      throw new Error('User is null or undefined');
    }
    return this.playerRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.playerRepository.delete(id);
  }
}
