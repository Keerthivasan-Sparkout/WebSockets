import { Injectable } from "@nestjs/common";
import { SubscribeMessage } from "@nestjs/websockets";
import { io, Socket } from "socket.io-client";

@Injectable()
export class UserSocket{

    public socket:Socket;


    constructor(){
        this.socket=io('http://localhost:3000')
    }

    @SubscribeMessage("onmessage")
    onMessage(payload:any){
        this.socket.on('onmessage',payload)
        this.socket.emit('newmessage',(payload)=>{
            console.log(payload)
        })
    }

    @SubscribeMessage("updatemessage")
    updateMessage(payload:any){
        this.socket.on('onmeupdatemessagessage',payload)
        this.socket.emit('updateNewMessage',(payload)=>{
            console.log(payload)
        })
    }

}