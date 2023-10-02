import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { PostService } from "./post.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { memoryStorage } from "multer"
import { S3BucketService } from "../s3/s3Bucket.service"
// import { PutObjectCommand } from "@aws-sdk/client-s3"

@ApiTags("post")
@Controller("post")
export class PostController {
  constructor(
    private postService: PostService,
    private s3BucketService: S3BucketService,
  ) {}

  @Get()
  async getAllPosts() {
    const posts = await this.postService.getAllPost()
    return posts
  }

  //TODO Dto
  @Get("id/:id")
  async getPostById(@Param() { id }: { id: number }) {
    const post = await this.postService.getOnePost(id)
    return post
  }

  // TODO : body dto
  @Post()
  @UseInterceptors(FileInterceptor("image", { storage: memoryStorage() }))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log("hit create post")
    console.log("file uploaded", file)
    console.log("body", body)
    const result = await this.s3BucketService.uploadByS3(file)
    console.log("uploaded result", result)
    //upload the image to S3
    // const commandToS3 = new PutObjectCommand({
    //     Bucket: process.env.S3_BUCKET,
    //     Key:
    // })
    return result
  }
  // TODO dto
  @Patch("id/:id")
  async updatePost(@Param() { id }: { id: number }, @Body() body: any) {
    return await this.postService.patchPost(id, body)
  }
}
