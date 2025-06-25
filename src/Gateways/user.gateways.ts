import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "Socket.io"
import { UserDto } from "src/User/user.dto";
import { User } from "src/User/user.schema";
import { UserService } from "src/User/user.service";


@WebSocketGateway({ namespace: '/user' })
export class UserGateway {

    @WebSocketServer()
    server: Server;

    constructor(private userService:UserService){}

    @SubscribeMessage("create user")
    async createUser(@MessageBody()  payload:{user:{user_name:string,user_address:string,user_Mobile:number}} , @ConnectedSocket() client: Socket) {
       let savedUser=await this.userService.createuser({
        ...payload.user,socketId:client.id
       })
       client.emit('user created',savedUser);
    }

}