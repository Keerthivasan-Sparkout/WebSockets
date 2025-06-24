import { Module } from "@nestjs/common";
import { UserSocket } from "./user.scoket";
import { ChatModule } from "src/chat/chat.module";

@Module({
    imports:[ChatModule],
    providers:[UserSocket]
})
export class userScoketModule{ 

}