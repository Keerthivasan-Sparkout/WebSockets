import { Module } from "@nestjs/common";
import { UserSocket } from "./user.scoket";

@Module({
    providers:[UserSocket]
})
export class userScoketModule{ 

}