import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player | null> {
    return this.playerService.findOne(id);
  }

  @Post()
  create(@Body() player: CreatePlayerDto): Promise<Player> {
    console.log('create player', player);
    return this.playerService.createPlayer(player);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.playerService.remove(id);
  }
}
