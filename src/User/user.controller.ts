import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.schema";

@Controller("/user")
export class UserController{

    constructor(private userService:UserService){

    }

    @Get()
    getAllUser(){
        return this.userService.getAllUser();
    }

    @Get("/:id")
    getUserById(@Param('id') id:string){
        return this.userService.getUserById(id)
    }

    @Post()
    async createUser(@Body() user:User){
       return await this.userService.createuser(user)
    }

    
    

}