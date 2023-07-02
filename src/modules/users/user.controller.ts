import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common"
import { User } from "@prisma/client"
import { isInt } from "class-validator"
import { UserService } from "src/modules/users/user.service"
import { HTTPStatusCodeRes } from "src/utils/httpExceptions"
import { ApiTags } from "@nestjs/swagger"
import { GetUserDto } from "./dto/GetUserDto"
import { CreateUserDto } from "./dto/CreateUserDto"

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @HttpCode(200)
  async getUserById(@Param() params: GetUserDto): Promise<User> {
    if (!isInt(params.id)) {
      throw new HTTPStatusCodeRes("Not A Number").badRequest()
    }
    return await this.userService.getUserById(params.id)
  }

  @Get()
  @HttpCode(200)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUser()
  }

  @Post()
  @HttpCode(204)
  async createUser(@Body() data: CreateUserDto): Promise<any> {
    const { username, email } = data
    const isUsernameExist = await this.userService.checkUsernameExist({
      username,
    })
    const isEmailExist = await this.userService.checkEmailExist({ email })
    if (isEmailExist.id || isUsernameExist.id) {
      return new HTTPStatusCodeRes("User Already Exist").badRequest()
    }
    this.userService.createUser(data)
    return { success: true, message: "User Created" }
  }
}
