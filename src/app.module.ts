import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewaysModules } from './Gateways/gateways.modules';
import { userScoketModule } from './scoket/scoket.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/websockets'),GatewaysModules,userScoketModule,ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
