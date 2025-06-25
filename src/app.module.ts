import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewaysModules } from './Gateways/gateways.modules';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/websockets-2'),GatewaysModules,ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
