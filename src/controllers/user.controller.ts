import { Controller, Get, HttpCode, Param, Res } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "src/services/user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('user/:id')
    @HttpCode(200)
    async getUserById(@Param("id") id:string): Promise<User>{
        const userId = parseInt(id)
        if(isNaN(userId)){
            throw new Error("id is invalid")
        }
        const data = await this.userService.getUserById(userId)
        return data
    }

    @Get('users')
    @HttpCode(200)
    async getAllUser(): Promise<User[]>{
        const data = await this.userService.getAllUser()
        console.log("get all user data", data)
        return data
    }
}