import { Module } from "@nestjs/common";
import { MyGateWays } from "./gateway";
import { ChatModule } from "src/chat/chat.module";
import { RoomModule } from "src/room/room.module";
import { UserModule } from "src/User/user.module";
import { UserGateway } from "./user.gateways";

@Module({
    imports:[ChatModule,RoomModule,UserModule],
    providers:[MyGateWays,UserGateway]
})
export class GatewaysModules{}