import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
    constructor(private readonly prisma: PrismaService){}

    getAllPlayers(){
        return this.prisma.player.findMany();
    }

    getAllPlayersByTeam(teamId:number){
        return this.prisma.player.findMany({
            where:{teamId},
        })
    }

    getAllPlayersByPosition(positionId:number){
        return this.prisma.player.findMany({
            where:{positionId},
        })
    }

    async createPlayer(data: CreatePlayerDTO){
        return this.prisma.player.create({
            data,
        })
    }

    async updatePlayer(data:UpdatePlayerDTO,id:number){
        const player = await this.prisma.player.findUnique({
            where:{id}
        });
        
        if(!player){
            throw new NotFoundException("Aucun joueur avec cette id n'existe");
        }

        return this.prisma.player.update({
            where:{id},
            data
        });
    }

    async deletePlayer(id: number){
        const player = await this.prisma.player.findUnique({
            where:{id}
        });
        
        if(!player){
            throw new NotFoundException("Aucun joueur avec cette id n'existe! Impossible de le supprimer");
        }
        
        return this.prisma.player.delete({where:{id}});
    }
}
