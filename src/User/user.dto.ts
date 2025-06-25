import { IsNumber, IsString } from "class-validator";

export class UserDto{
@IsString()
    user_name:string;
        @IsString()
        user_address:string;
        @IsNumber()
        user_Mobile:number;
         @IsString()
        socketId:string;
}