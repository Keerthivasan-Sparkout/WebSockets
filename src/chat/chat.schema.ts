import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



@Schema()
export class chats{

    @Prop()
    sender:string;
    @Prop()
    message:string

}

export const chatSchema=SchemaFactory.createForClass(chatschema);