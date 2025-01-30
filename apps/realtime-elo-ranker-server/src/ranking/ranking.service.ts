import { Injectable } from '@nestjs/common';
import { Player } from '../player/entities/player.entity';
import { PlayerService } from '../player/player.service';

@Injectable()
export class RankingService {
  constructor(private readonly playerService: PlayerService) {}

  async getRanking(): Promise<Player[]> {
    const players = await this.playerService.findAll();
    return players.sort((a, b) => a.rank - b.rank);
  }
}
