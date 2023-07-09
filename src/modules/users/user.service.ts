import { Injectable } from "@nestjs/common"
import { PrismaService } from "../db/prisma.service"
import { User } from "@prisma/client"
import { CheckUserDto } from "../dto/CheckUserDto"
import { CreateUserDto } from "../dto/CreateUserDto"
import { GetUserDto } from "../dto/GetUserDto"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUserById(id: GetUserDto["id"]): Promise<User> {
    try {
      return this.prisma.user.findUnique({
        where: {
          id: id,
        },
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  getAllUser(): Promise<User[]> {
    try {
      return this.prisma.user.findMany()
    } catch (e) {
      throw new Error(e)
    }
  }

  async checkUserExist({ email, username }: CheckUserDto) {
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          email,
          username,
        },
        select: {
          id: true,
        },
      })
      return result?.id ? true : false
    } catch (e) {
      throw new Error(e)
    }
  }

  getUserByEmail(email: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          email: true,
          password: true,
          username: true,
          id: true,
        },
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async createUser(userInfo: CreateUserDto): Promise<void> {
    try {
      await this.prisma.user.create({
        data: userInfo,
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}
