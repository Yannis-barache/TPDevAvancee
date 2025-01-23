import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from '../entities/player.entity';

@Controller('Player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player | null> {
    return this.playerService.findOne(+id);
  }

  @Post()
  create(@Body() user: Player): Promise<Player> {
    return this.playerService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.playerService.remove(+id);
  }
}
