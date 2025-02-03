import { Controller, Get, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { fromEvent, map, merge, Observable } from 'rxjs';
import { Player } from '../player/entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('api/ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  getRanking() {
    return this.rankingService.getRanking();
  }

  @Sse('events')
  sse(): Observable<MessageEvent> {
    const playerCreated = fromEvent(this.eventEmitter, 'player.created').pipe(
      map((event: { player: Player }) => {
        console.log('ON a bien recu la MAJ');
        return <MessageEvent>{
          data: {
            type: 'RankingUpdate',
            player: event.player,
          },
        };
      }),
    );

    const matchResult = fromEvent(this.eventEmitter, 'match.result').pipe(
      map((event: { player: Player }) => {
        console.log('ON a bien recu la MAJ pour ' + event.player.id);
        return <MessageEvent>{
          data: {
            type: 'RankingUpdate',
            player: event.player,
          },
        };
      }),
    );

    return merge(playerCreated, matchResult);
  }
}
