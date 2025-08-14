import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/register')
    async register(@Body() createUserDTO: CreateUserDTO){
        return this.authService.register(createUserDTO)
    }
    @Post('/login')
    async login (@Body() login:LoginDTO){
        return this.authService.login(login)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req){
        return this.authService.validateUser(req.user.userId)
    }
}
