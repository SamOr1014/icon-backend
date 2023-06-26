import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { User } from "@prisma/client"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    })
  }

  getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  getUserByUsername(email: string): Promise<Omit<User, "id">> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
        username: true,
      },
    })
  }
}
