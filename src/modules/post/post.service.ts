import { Injectable } from "@nestjs/common"
import { PrismaService } from "../db/prisma.service"

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPost() {
    try {
      return await this.prisma.post.findMany()
    } catch (e) {
      throw new Error(e)
    }
  }

  async getOnePost(id: number) {
    try {
      return await this.prisma.post.findUnique({
        where: {
          id,
        },
      })
    } catch (e) {
      throw new Error(e)
    }
  }
  // TODO : type
  async postPost(post: any) {
    try {
      return await this.prisma.post.create({
        data: post,
      })
    } catch (e) {
      throw new Error(e)
    }
  }
  // TODO : type
  async patchPost(id: number, payloads: any) {
    try {
      return await this.prisma.post.update({
        where: {
          id: id,
        },
        data: payloads,
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}
