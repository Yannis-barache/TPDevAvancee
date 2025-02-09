import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PlayerService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: string): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id });
  }

  async createPlayer(player: CreatePlayerDto): Promise<Player> {
    console.log('create dans le service', player);
    if (player === null || player === undefined) {
      throw new Error('User is null or undefined');
    }
    if (player.rank === null || player.rank === undefined) {
      // Fais la moyenne des rank de tous les joueurs
      const players = await this.findAll();
      if (players.length === 0) {
        player.rank = 1000;
      }
      else {
        let rank = 0;
        players.forEach((p) => {
          rank += p.rank;
        });
        rank = Math.round(rank) / players.length;
        player.rank = rank;
      }
    }
    const newPlayer = await this.playerRepository.save(player);
    this.eventEmitter.emit('player.created', {
      player: {
        id: newPlayer.id,
        rank: newPlayer.rank,
      },
    });
    return newPlayer;
  }

  async remove(id: string): Promise<void> {
    await this.playerRepository.delete(id);
  }

  async updateRank(winner: string, winnerNewRank: number) {
    await this.playerRepository.update(winner, { rank: winnerNewRank });
  }
}
