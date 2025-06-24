import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { MongooseModule } from "@nestjs/mongoose";
import { chats, chatSchema } from "./chat.schema";

@Module(
    {
        imports:[MongooseModule.forFeature([{name:chats.name,schema:chatSchema}])],
        providers:[ChatService],
        exports:[ChatService]
    }
)
export class ChatModule{

}