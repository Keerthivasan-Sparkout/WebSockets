import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{

    @Prop()
    user_name:string;
    @Prop()
    user_address:string;
    @Prop()
    user_Mobile:number;
    @Prop()
    socketId:string

}

export const UserSchema=SchemaFactory.createForClass(User)