import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewaysModules } from './Gateways/gateways.modules';
import { userScoketModule } from './scoket/scoket.module';

@Module({
  imports: [GatewaysModules,userScoketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
