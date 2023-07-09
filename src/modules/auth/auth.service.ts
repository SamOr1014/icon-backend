import { Injectable } from "@nestjs/common"
import { PrismaService } from "../db/prisma.service"
import { UserService } from "../users/user.service"
import { User } from "@prisma/client"

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private user: UserService) {}

  async login(email: string): Promise<User> {
    return await this.user.getUserByEmail(email)
  }
}
