import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { UserModule } from "../users/user.module"
import { AuthService } from "./auth.service"
import { DBModules } from "../db/prisma.module"
import { JwtModule } from "@nestjs/jwt"
import { jwtSecret } from "src/constants/jwt"

@Module({
  imports: [
    UserModule,
    DBModules,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: {
        expiresIn: "7d",
      },
      verifyOptions: {
        ignoreExpiration: false,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModules {}
