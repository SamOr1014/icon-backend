import { Module } from "@nestjs/common"
import { ImageGenerationController } from "./image.controller"
import { S3BucketService } from "../s3Client/s3Bucket.service"
import { HttpModule } from "@nestjs/axios"
import { HUGGING_FACE_API_TOKEN } from "./constants"

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
      },
    }),
  ],
  controllers: [ImageGenerationController],
  providers: [S3BucketService],
})
export class ImageGenerationModule {}
