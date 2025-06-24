import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class chats{

    @Prop()
    sender:string;
    @Prop()
    message:string

}

export const chatSchema=SchemaFactory.createForClass(chats);