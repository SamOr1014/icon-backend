import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { CheckUserDto } from "./dto/CheckUserDto"
import { LoginDto } from "./dto/LoginDto"
import { JwtService } from "@nestjs/jwt"
import { Request, Response } from "express"
import { UserService } from "@src/modules/users/user.service"
import { AuthService } from "./auth.service"
import { loginVerification } from "./utils/utils.helpers"
import { AuthGuard } from "@src/middlewares/authGuard.guard"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get("check")
  @HttpCode(200)
  async checkUserExists(@Query() query: CheckUserDto) {
    const result = await this.userService.checkUserExist(query)
    return { userExists: result }
  }

  @Get("logout")
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token")
    return { success: true, message: "logout success" }
  }

  @Post("login")
  @HttpCode(200)
  async login(
    @Body() loginDetail: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = loginDetail
    const user = await this.authService.login(email)

    await loginVerification(user, password)
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    })
    res.cookie("Authentication", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    })
    return { success: true, message: "login success" }
  }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async authWithToken(@Req() req: Request) {
    return req["user"]
  }
}
