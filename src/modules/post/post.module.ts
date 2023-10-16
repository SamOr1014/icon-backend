import { Module } from "@nestjs/common"
import { DBModules } from "../db/prisma.module"
import { PostController } from "./post.controller"
import { PostService } from "./post.service"
import { MulterModule } from "@nestjs/platform-express"
import { memoryStorage } from "multer"
import { S3BucketService } from "../s3Client/s3Bucket.service"

@Module({
  imports: [
    DBModules,
    MulterModule.register({
      storage: memoryStorage,
    }),
  ],
  controllers: [PostController],
  providers: [PostService, S3BucketService],
})
export class PostModule {}
