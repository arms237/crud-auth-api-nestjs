import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, BadRequestException } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';

@Controller('player')
export class PlayerController {
    constructor (private readonly playerServices: PlayerService){}

    @Get('/all')
    getAllPlayers(){
        return this.playerServices.getAllPlayers();
    }

    @Get('/all/team/:teamId')
    getAllPlayersByTeam(@Param('teamId', new ParseIntPipe({ 
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BadRequestException('L\'ID de l\'équipe doit être un nombre valide')
    })) teamId:number){
        return this.playerServices.getAllPlayersByTeam(teamId);
    }

    @Get('/all/position/:positionId')
    getAllPlayersByPosition(@Param('positionId', new ParseIntPipe({ 
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BadRequestException('L\'ID de la position doit être un nombre valide')
    })) positionId:number){
        return this.playerServices.getAllPlayersByPosition(positionId);
    }
    
    @Post('/create')
    createPlayer(@Body() data:CreatePlayerDTO){
        return this.playerServices.createPlayer(data)
    }
    
    @Put('/:id')
    updatePlayer(@Param('id', new ParseIntPipe({ 
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BadRequestException('L\'ID du joueur doit être un nombre valide')
    })) id:number, @Body() data:UpdatePlayerDTO ){
        return this.playerServices.updatePlayer(data,id)
    }
    
    @Delete('/:id')
    deletePlayer(@Param('id', new ParseIntPipe({ 
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BadRequestException('L\'ID du joueur doit être un nombre valide')
    })) id:number){
        return this.playerServices.deletePlayer(id)
    }
}
