import { OnModuleInit } from "@nestjs/common"
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server } from "Socket.io"
import { Socket } from "socket.io-client"
import { ChatService } from "src/chat/chat.service"

@WebSocketGateway()
export class MyGateWays implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect   {


    @WebSocketServer()
    public server:Server

    constructor(private chatService:ChatService){}

    afterInit(server: any) {
         this.server.on('connection',(socket)=>{
            console.log(socket.id)
        }
        )
    }

    handleDisconnect(client: any) {
       console.log("Connected Client id ;"+client.id)
    }

    handleConnection(client: any, ...args: any[]) {
        console.log("Disconnected Client id ;"+client.id)
    }


    @SubscribeMessage("chat start")
    handleMessages(@MessageBody() body:any ,@ConnectedSocket() client:Socket){
        let save_data=this.chatService.createChatActive(client.id,body)
        client.emit("replay chat",save_data)
    }


}