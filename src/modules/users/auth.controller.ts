import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common"
import { UserService } from "src/modules/users/user.service"
import { isEmpty, isNotEmptyObject } from "class-validator"
import { HTTPStatusCodeRes } from "src/utils/httpExceptions"
import { randomBytes } from "crypto"
import { ApiTags } from "@nestjs/swagger"
import { CheckUserDto } from "./dto/CheckUserDto"
import { LoginDetailDto } from "./dto/LoginDetailDto"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async auth() {
    return "auth"
  }

  @Get("checkuser")
  @HttpCode(200)
  async checkUsernameExist(@Query() query: CheckUserDto) {
    if (!isNotEmptyObject(query))
      throw new HTTPStatusCodeRes("No Query Provided").badRequest()
    const username = query.username
    const email = query.email
    if (username && email) {
      throw new HTTPStatusCodeRes("Invalid Query").badRequest()
    }
    if (username) {
      const result = await this.userService.checkUsernameExist(query)
      return { usernameExist: !!result?.id }
    }
    if (email) {
      const result = await this.userService.checkEmailExist(query)
      return { emailExist: !!result?.id }
    }
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() loginDetail: LoginDetailDto) {
    if (!isNotEmptyObject(loginDetail))
      throw new HTTPStatusCodeRes("No Credential Provided").unauthorized()

    const { email, password } = loginDetail

    if (isEmpty(email) || isEmpty(password))
      throw new HTTPStatusCodeRes("Missing Credential").unauthorized()

    const user = await this.userService.getUserByEmail(email)

    if (!user) throw new HTTPStatusCodeRes("User Not Found").unauthorized()

    if (user.password !== password)
      throw new HTTPStatusCodeRes("Invalid Credentials").unauthorized()

    //TODO: fix random byte to JWT token later
    return { success: true, token: randomBytes(256).toString("hex") }
  }
}
