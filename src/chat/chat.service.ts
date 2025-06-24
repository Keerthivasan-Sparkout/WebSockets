import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { chats } from "./chat.schema";

@Injectable()
export class ChatService{

    constructor(@InjectModel(chats.name) private chatmodel:mongoose.Model<chats>){}


    createChatActive(client:number,content:string ){
      return  this.chatmodel.insertOne({
            sender:client,
            message:content
        })
    }

    

}