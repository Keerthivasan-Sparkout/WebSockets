import { InjectModel } from "@nestjs/mongoose";
import { room } from "./room.schema";
import mongoose from "mongoose";
import { User } from "src/User/user.schema";

export class UserRoomService {

    constructor(@InjectModel(room.name) private roomModel: mongoose.Model<room>) { }

    async createRoom(host: User, roomName: string) {
        let room = this.getRoomByName(roomName)
        if (room === null) {
            return await this.roomModel.insertOne({ host_name: host, room_name: roomName, user_list: [host] })
        }
    }

    async addRoomMates(roomName: string, user: User) {
        let room = await this.getRoomByName(roomName)
        let user_index = room?.user_list.findIndex(members => members.user_name === user.user_name)
        if (user_index !== -1) {
            room?.user_list.push(user)
        }
    }

    getRoomByName(roomName: string) {
        return this.roomModel.findOne({ room_name: roomName })
    }

    async removeRoomMates(roomName: string, user: User) {
        let room = await this.getRoomByName(roomName)
        if (room !== null) {
            let user_index = room?.user_list.findIndex(members => members.user_name === user.user_name)
            if (user_index !== -1) {
                room.user_list = room.user_list.filter(members => members !== user)
                return this.roomModel.updateOne({ room_name: room.room_name })
            }
        }
    }

    
}