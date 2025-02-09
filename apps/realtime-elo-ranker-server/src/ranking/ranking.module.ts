import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PlayerModule } from '../player/player.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [PlayerModule, EventEmitterModule.forRoot()],
  providers: [RankingService],
  exports: [RankingService],
  controllers: [RankingController],
})
export class RankingModule {}
