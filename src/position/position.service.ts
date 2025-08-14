import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PositionService {
    constructor(private readonly prisma: PrismaService){}

    async getAllPositions() {
        return this.prisma.position.findMany();
    }

    async getOnePosition(id: number){
        const position = await this.prisma.position.findUnique({
            where:{id},
        });
        if(!position){
            throw new NotFoundException('Aucun poste n\'existe avec cet id')
        }
        return position;
    }

    async createPosition(data:any){
        const position = await this.prisma.position.findFirst({
            where:{name:data.name},
        });
        if(position){
            throw new BadRequestException('Le poste existe déjà');
        }
        return this.prisma.position.create({
            data,
        });
    }

    async updatePosition(id:number, data:any){
        const position = await this.prisma.position.findUnique({
            where:{id},
        });
        if(!position){
            throw new NotFoundException('Aucun poste n\'existe avec cet id');
        }
        return this.prisma.position.update({
            where:{id},
            data,
        })
    }

    async deletePosition(id: number){
        const position = await this.prisma.position.findUnique({
            where:{id},
        });
        if(!position){
            throw new NotFoundException('Aucun poste n\'existe avec cet id');
        }
        return this.prisma.position.delete({
            where:{id},
        })
    }
}
