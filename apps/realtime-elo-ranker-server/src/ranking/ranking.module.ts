import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [PlayerModule],
  providers: [RankingService],
  exports: [RankingService],
  controllers: [RankingController],
})
export class RankingModule {}
