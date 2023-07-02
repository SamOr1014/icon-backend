import { Injectable } from "@nestjs/common"
import { PrismaService } from "../db/prisma.service"
import { User } from "@prisma/client"
import { CheckUserDto } from "./dto/CheckUserDto"
import { CreateUserDto } from "./dto/CreateUserDto"
import { GetUserDto } from "./dto/GetUserDto"

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

  checkUsernameExist({ username }: CheckUserDto) {
    try {
      return this.prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  checkEmailExist({ email }: CheckUserDto) {
    try {
      return this.prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  getUserByEmail(email: string): Promise<Omit<User, "id">> {
    try {
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
