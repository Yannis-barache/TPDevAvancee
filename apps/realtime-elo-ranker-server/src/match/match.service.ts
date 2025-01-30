import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import {Player} from "../player/entities/player.entity";
import {PlayerService} from "../player/player.service";
import {CreateMatchDto} from "./dto/create-match.dto";

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private readonly playerService: PlayerService,
  ) {}

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find();
  }

  async createMatch(match: CreateMatchDto): Promise<Match> {
    // Verif de l'existance des joueurs
    const winner = await this.playerService.findOne(match.winner);
    const loser = await this.playerService.findOne(match.loser);
    if (winner === null || loser === null) {
      throw new Error('Winner or loser not found');
    }
    return this.matchRepository.save(match);
  }

  async findOne(id: number): Promise<Match | null> {
    return this.matchRepository.findOneBy({ id });
  }
}
