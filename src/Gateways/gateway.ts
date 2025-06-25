import { UnauthorizedException } from "@nestjs/common"
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { group } from "console"
import { Server } from "Socket.io"
import { Socket } from "socket.io-client"
import { ChatService } from "src/chat/chat.service"
import { UserRoomService } from "src/room/user.room.service"
import { User } from "src/User/user.schema"
import { UserService } from "src/User/user.service"

@WebSocketGateway({ namespace: '/chat' })
export class MyGateWays implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


    @WebSocketServer()
    public server: Server

    constructor(private chatService: ChatService,
        private roomService: UserRoomService,
        private userservice: UserService
    ) { }

    afterInit(server: any) {
        this.server.on('connection', (socket) => {
            console.log(socket.id)
        }
        )
    }

    handleDisconnect(client: any) {
        console.log("Connected Client id :" + client.id)
    }

    handleConnection(client: any, ...args: any[]) {
        console.log("Disconnected Client id :" + client.id)
    }


    @SubscribeMessage("chat start")
    handleMessages(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
        let save_data = this.chatService.createChatActive(client.id, body)
        client.emit("replay chat", save_data)
    }

    @SubscribeMessage("create room")
    async createRoom(@MessageBody() payload: { users: User, roomname: string }) {
        let newuser = await this.userservice.getUserByName(payload.users.user_name);
        if (newuser !== null) {
            this.server.in(payload.users.socketId).socketsJoin(payload.roomname)
            this.roomService.createRoom(payload.users, payload.roomname).then(prop => {
                this.server.to(payload.roomname).emit(`you join the group ${payload.roomname}`)
            })
        }
    }

    @SubscribeMessage("exit room")
    async removeFromRoom(@MessageBody() payload: { users: User, roomname: string }) {
        let newuser = await this.userservice.getUserByName(payload.users.user_name);
        let newroom = this.roomService.getRoomByName(payload.roomname)
        if (newuser !== null && newroom !== null) {
            this.server.in(payload.users.socketId).socketsLeave(payload.roomname)
            this.roomService.removeRoomMates(payload.roomname, payload.users).then(prop => {
                this.server.to(payload.roomname).emit(`${payload.users.user_name} exits from the group ${payload.roomname}`)
            })
        }
    }

    @SubscribeMessage("message to group")
    async messageToGroup(@MessageBody() msg: { sender: string, message: string, group: string }, @ConnectedSocket() client: Socket) {
        let newuser = await this.userservice.getUserByName(msg.sender);
        let newroom = this.roomService.getRoomByName(msg.group)
        if (newuser !== null && newroom !== null) {
            this.server.except(msg.group).emit("recived")
        }
    }

    @SubscribeMessage("private message")
    messageToParticularclient(@MessageBody() msg: { sender_socketId: string, receier_socketId: string, contents: string }) {
        let sender = this.userservice.getUserBySocketId(msg.sender_socketId);
        let reciver = this.userservice.getUserBySocketId(msg.receier_socketId);
        if (sender !== null && reciver !== null) {
            this.server.to(msg.receier_socketId).emit("new message", msg.contents)
        }
    }

}