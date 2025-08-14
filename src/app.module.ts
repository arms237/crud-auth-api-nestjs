import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionModule } from './position/position.module';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PositionModule, TeamModule, PlayerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
