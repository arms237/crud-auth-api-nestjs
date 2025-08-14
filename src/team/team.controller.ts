import { Controller,Get,Post,Param, ParseIntPipe, Body, Put, Delete} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeam } from './dto/create-team.dto';
import { UpdateTeam } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService){}

    @Get('/all')
    getTeams(){
        return this.teamService.getTeams();
    }

    @Get('/:id')
    getOneTeam(@Param('id', ParseIntPipe) id:number){
        return this.teamService.getOneTeam(id);
    }

    @Post('/create')
    createTeam(@Body() data: CreateTeam){
        return this.teamService.createTeam(data);
    }

    @Put('/:id')
    updateTeam(@Param('id',ParseIntPipe) id:number, @Body() data:UpdateTeam){
        return this.teamService.updateTeam(id,data);
    }

    @Delete('/:id')
    deleteTeam(@Param('id', ParseIntPipe) id:number){
        return this.teamService.deleteTeam(id);
    }
}
