import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService){}

    async register (createUserDTO: CreateUserDTO){
        const {firstName, lastName, email,password} = createUserDTO;

        const userExist = await this.prisma.user.findUnique({
            where: {email},
        })

        if(userExist){
            throw new ConflictException("Un utilisateur possède déjà cet email !");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        const user = await this.prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password:hashedPassword,
            },
            select:{
                id: true,
                firstName: true,
                lastName:true,
                email:true,
                createdAt: true,
            }
        });

        const payload = {sub: user.id, email: user.email};
        const access_token = await this.jwt.signAsync(payload)

        return{
            user,
            access_token,
        }
    }

    async login(loginDTO: LoginDTO){
        const {email, password} = loginDTO;

        const user = await this.prisma.user.findUnique({
            where:{email}
        })

        if(!user){
            throw new UnauthorizedException("Identifiants invalides !");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException("Identifiants invalides !");
        }
        const payload = {sub: user.id, email:user.email};
        const access_token = await this.jwt.signAsync(payload);

        return{
            user:{
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt,
            },
            access_token,
        }
    }

    async validateUser(userId: number){
        if (!userId) {
            throw new UnauthorizedException('Token invalide');
        }
        
        const user = await this.prisma.user.findUnique({
            where:{id: userId},
            select:{
                id: true,
                firstName:true,
                lastName:true,
                email: true,
                createdAt:true
            }
        });
        
        if (!user) {
            throw new UnauthorizedException('Utilisateur non trouvé');
        }
        
        return user;
    }

   
}
