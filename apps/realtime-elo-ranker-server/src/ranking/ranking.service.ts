import { Injectable } from '@nestjs/common';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class RankingService {
  constructor() {}

  async getRanking(): Promise<Player[]> {
    const response = await fetch('http://localhost:3000/api/player');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const players: Player[] = await response.json();
    return players.sort((a, b) => a.rank - b.rank);
  }
}
