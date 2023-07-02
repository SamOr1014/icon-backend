import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"
import { AuthController } from "./auth.controller"
import { UserService } from "./user.service"
import { PrismaService } from "src/modules/db/prisma.service"

@Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
