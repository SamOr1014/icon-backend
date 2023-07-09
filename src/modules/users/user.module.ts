import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { DBModules } from "../db/prisma.module"

@Module({
  imports: [DBModules],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
