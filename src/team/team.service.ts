import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeam } from './dto/create-team.dto';
import { UpdateTeam } from './dto/update-team.dto';

@Injectable()
export class TeamService {
    constructor (private readonly prisma:PrismaService){}

    //Récupérer toutes les teams
    async getTeams(){
        return this.prisma.team.findMany();
    }

    //Récupérer une team en particulier
    async getOneTeam(id :number){
        const team = await this.prisma.team.findUnique({where:{id}});
        if(!team){
            throw new NotFoundException('Cette équipe n\'existe pas');
        }
        return team;
    }

    //Créer une team 
    async createTeam(data:CreateTeam){
        const team = await this.prisma.team.findFirst(
            {
                where:{name:data.name}
            }
        )
        if(team){
            throw new BadRequestException('Cette team existe déjà!');
        }
        return this.prisma.team.create({
            data,
        })
    }

    //Mettre a jour
    async updateTeam(id:number,data:UpdateTeam){
        console.log('🔍 Tentative de mise à jour de l\'équipe:', { id, data });
        
        const team = await this.prisma.team.findUnique({where:{id}});
        if(!team){
            throw new NotFoundException('Cette équipe n\'existe pas');
        }
        
        console.log('📋 Équipe trouvée:', team);
        console.log('📝 Données à mettre à jour:', data);
        
        const updatedTeam = await this.prisma.team.update({
            where:{id},
            data
        });
        
        console.log('✅ Équipe mise à jour:', updatedTeam);
        
        return updatedTeam;
    }

    //Supprimer
    async deleteTeam(id:number){
        const team = await this.prisma.team.findUnique({where:{id}});
        if(!team){
            throw new NotFoundException('Cette équipe n\'existe pas');
        }
        return this.prisma.team.delete({where:{id}})
    }
}
