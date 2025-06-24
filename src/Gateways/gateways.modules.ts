import { Module } from "@nestjs/common";
import { MyGateWays } from "./gateway";
import { ChatModule } from "src/chat/chat.module";

@Module({
    imports:[ChatModule],
    providers:[MyGateWays]
})
export class GatewaysModules{}