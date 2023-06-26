import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common"
import { UserService } from "src/services/user.service"
import { LoginDetailDto } from "./dto/AuthDto"
import { isEmpty, isNotEmptyObject } from "class-validator"
import { HTTPStatusCodeRes } from "src/utils/httpStatus"
import { createHash, randomBytes } from "crypto"

@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async auth() {
    return "auth"
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() loginDetail: LoginDetailDto) {
    if (!isNotEmptyObject(loginDetail))
      throw new HTTPStatusCodeRes("NO CREDENTIALS PROVIDED").unauthorized()

    const { email, password } = loginDetail

    if (isEmpty(email) || isEmpty(password))
      throw new HTTPStatusCodeRes("MISSING CREDENTIALS").unauthorized()

    const user = await this.userService.getUserByUsername(email)

    if (!user) throw new HTTPStatusCodeRes("USER NOT FOUND").unauthorized()

    if (user.password !== password)
      throw new HTTPStatusCodeRes("INVALID CREDENTIALS").unauthorized()

    //TODO: fix random byte to JWT token later
    return { success: true, token: randomBytes(256).toString("hex") }
  }
}
