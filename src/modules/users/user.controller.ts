import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common"
import { User } from "@prisma/client"
import { isInt } from "class-validator"
import { UserService } from "src/modules/users/user.service"
import { HTTPStatus } from "src/utils/httpExceptions"
import { ApiTags } from "@nestjs/swagger"
import { GetUserDto } from "../dto/GetUserDto"
import { CreateUserDto } from "../dto/CreateUserDto"
import { hashString } from "src/utils/hashing"

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @HttpCode(200)
  async getUserById(@Param() params: GetUserDto): Promise<User> {
    if (!isInt(params.id)) {
      throw new HTTPStatus("Not A Number").badRequest()
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
    const { username, email, password } = data
    const isUsernameExist = await this.userService.checkUserExist({
      username,
    })
    const isEmailExist = await this.userService.checkUserExist({ email })
    console.log("has Email?", isEmailExist)
    console.log("has username?", isUsernameExist)
    if (isEmailExist || isUsernameExist) {
      console.log("User Already Exist")
      throw new HTTPStatus("User Already Exist").badRequest()
    }
    this.userService.createUser({
      username,
      email,
      password: await hashString(password),
    })
    return { success: true, message: "User Created" }
  }
}
