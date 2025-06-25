import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";
import { UserDto } from "./user.dto";

@Injectable()
export class UserService {
    

    constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>) { }

    async createuser(user:UserDto) {
        let newuser=new this.userModel(user)
       return newuser.save()
        //  return await this.userModel.insertOne(user)
    }

    updateuser(id: string, user: UserDto) {
        return this.userModel.findByIdAndUpdate(id, user, { new: true })
    }

    async deleteuser(id: string) {
        return await this.userModel.findByIdAndDelete(id)
    }

    getUserById(id: string) {
        return this.userModel.findById(id);
    }

    getUserByMobile(num: number) {
        return this.userModel.find({ user_Mobile: num }).exec();
    }

    getUserByName(name: string) {
        return this.userModel.find({ user_name: name }).exec();
    }

    getUserBySocketId(id: string) {
        return this.userModel.find({ socketId: id }).exec();
    }

    getAllUser() {
        return this.userModel.find();
    }
}