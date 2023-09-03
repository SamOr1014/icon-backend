import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { UserService } from "src/modules/users/user.service"
import { HTTPStatus } from "src/utils/httpExceptions"
import { ApiTags } from "@nestjs/swagger"
import { GetUserDto } from "./dto/GetUserDto"
import { CreateUserDto } from "./dto/CreateUserDto"
import { hashString } from "src/utils/hashing"
import { UserWithoutPassword } from "./types/user"
import { Request } from "express"
import { AuthGuard } from "@src/middlewares/authGuard.guard"

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/id/:id")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getUserById(@Param() params: GetUserDto): Promise<UserWithoutPassword> {
    const userDetail = await this.userService.getUserById(params.id)
    return userDetail
  }

  @Get("current")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: Request): Promise<any> {
    console.log("in current")
    console.log(req["user"])
    // return await this.userService.getUserById(user.id)
    return { success: true, message: "called current user" }
  }

  @Get("all")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<UserWithoutPassword[]> {
    return await this.userService.getAllUser()
  }

  @Post()
  @HttpCode(200)
  async createUser(
    @Body() data: CreateUserDto,
  ): Promise<{ success: boolean; message: string }> {
    const { username, email, password } = data
    const isUsernameExist = await this.userService.checkUserExist({
      username,
    })
    const isEmailExist = await this.userService.checkUserExist({ email })
    if (isEmailExist || isUsernameExist) {
      throw new HTTPStatus("User Already Exist").badRequest()
    }
    await this.userService.createUser({
      username,
      email,
      password: await hashString(password),
    })
    return { success: true, message: "User Created" }
  }
}
