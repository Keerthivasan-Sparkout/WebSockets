import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/User/user.schema";

export type rooms=HydratedDocument<room>


@Schema()
export class room{

    @Prop()
    host_name:string
     @Prop({unique:true})
    room_name:string
    @Prop()
    user_list:User[]

}

export const roomSchema=SchemaFactory.createForClass(room)