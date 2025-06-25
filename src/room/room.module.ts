import { Module } from "@nestjs/common";
import { UserRoomService } from "./user.room.service";
import { MongooseModule } from "@nestjs/mongoose";
import { room, roomSchema } from "./room.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:room.name,schema:roomSchema}])],
    providers:[UserRoomService],
    exports:[UserRoomService]
})
export class RoomModule{}