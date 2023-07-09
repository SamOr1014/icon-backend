import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common"
import { UserService } from "src/modules/users/user.service"
import { isEmpty, isNotEmptyObject } from "class-validator"
import { HTTPStatus } from "src/utils/httpExceptions"
import { ApiTags } from "@nestjs/swagger"
import { CheckUserDto } from "../dto/CheckUserDto"
import { LoginDto } from "../dto/LoginDto"
import { AuthService } from "./auth.service"
import { JwtService } from "@nestjs/jwt"
import { compareHash } from "src/utils/hashing"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @HttpCode(200)
  async auth() {
    return "auth"
  }

  @Get("checkuser")
  @HttpCode(200)
  async checkUsernameExist(@Query() query: CheckUserDto) {
    if (!isNotEmptyObject(query))
      throw new HTTPStatus("No Query Provided").badRequest()

    const username = query.username
    const email = query.email

    if (username && email) {
      throw new HTTPStatus("Invalid Query").badRequest()
    }
    if (username) {
      const result = await this.userService.checkUserExist(query)
      return { usernameExist: result }
    }
    if (email) {
      const result = await this.userService.checkUserExist(query)
      return { emailExist: result }
    }
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() loginDetail: LoginDto) {
    if (!isNotEmptyObject(loginDetail))
      throw new HTTPStatus("No Credential Provided").unauthorized()

    const { email, password } = loginDetail

    if (isEmpty(email) || isEmpty(password))
      throw new HTTPStatus("Missing Credential").unauthorized()

    const user = await this.authService.login(email)

    if (!user || !(await compareHash(password, user.password)))
      throw new HTTPStatus("Invalid Credentials").unauthorized()

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    })
    console.log("access token", accessToken)
    //TODO: fix random byte to JWT token later
    return { success: true, message: "login success" }
  }
}
