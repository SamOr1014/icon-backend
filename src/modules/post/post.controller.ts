import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { PostService } from "./post.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { memoryStorage } from "multer"
import { CreatePostDto } from "./dto/createPostDto"
import { GetPostDto } from "./dto/GetPostDto"
import { S3BucketService } from "../s3Client/s3Bucket.service"
import { ImageTypeValidator } from "./validator/ImageTypeValidator"

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
  async getPostById(@Param() { id }: GetPostDto) {
    const post = await this.postService.getOnePost(id)
    return post
  }

  @Post()
  @UseInterceptors(FileInterceptor("image", { storage: memoryStorage() }))
  async createPost(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new ImageTypeValidator({ fileType: ["image/jpeg", "image/png"] }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreatePostDto,
  ) {
    try {
      const { url } = await this.s3BucketService.handleUploadedImage(file)
      await this.postService.createPost({
        image: url,
        title: body.title,
        caption: body.caption,
      })
      return
    } catch (e) {
      console.log(e)
      return
    }
  }

  @Patch("id/:id")
  async updatePost(
    @Param() { id }: { id: number },
    @Body() body: CreatePostDto,
  ) {
    return await this.postService.patchPost(id, body)
  }
}
