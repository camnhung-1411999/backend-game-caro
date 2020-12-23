import { Body, Controller, Get, Param, UseGuards, Request, Post, Put } from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
import { ApiTags } from '@nestjs/swagger';
import { RoomInput } from '../interface/room.interface';
import {JwtAuthGuard } from '../interface/user.guard';
@Controller('/rooms')
@ApiTags('Room')
export class RoomController {
  constructor(private readonly appService: RoomService) {}

  @Get()
  list(): any {
    return this.appService.list();
  }

  @Get('/:id')
  getRoom(@Param('id') idroom: string): any {
    return this.appService.getRoom(idroom);
  }


  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(@Request() req): Promise<Room> {
    const data = {
        player1: req.user.user,
        player2: null,
        idroom: null,
    }
    return this.appService.create(data);
  }

  @Put('/join/:id')
  @UseGuards(JwtAuthGuard)
  join(@Param('id') idroom: string, @Request() req): Promise<any> {
    const data = {
        idroom,
        player: req.user.user,
    }
    return this.appService.join(data);
  }

  @Put('/out/:id')
  @UseGuards(JwtAuthGuard)
  out(@Param('id') idroom: string,@Request() req): Promise<any> {
    const data = {
        idroom,
        player: req.user.user,
    }
    return this.appService.outRoom(data);
  }
}
