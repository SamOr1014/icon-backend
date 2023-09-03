import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { HTTPStatus } from "@src/utils/httpExceptions"
import { Request } from "express"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.retrieveAuthToken(request)
    console.log("token", token)
    try {
      const { sub, username } = await this.verifyJWTToken(token)
      request["user"] = { id: sub, username }
    } catch (e) {
      throw new HTTPStatus().unauthorized()
    }
    console.log("pass auth")
    return true
  }

  private retrieveAuthToken(req: Request) {
    return req.cookies["Authentication"]
  }

  private async verifyJWTToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    })
  }
}
