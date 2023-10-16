import { Body, Controller, Get } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { S3BucketService } from "../s3Client/s3Bucket.service"
import { GetImageDto } from "./dto/GetImageDto"
import { HttpService } from "@nestjs/axios"
import { PIXEL_ART_URL, STABLE_DIFFUSION_URL } from "./constants"
import { lastValueFrom } from "rxjs"
import { convertToBuffer } from "./utils/convertToBuffer"

@ApiTags("imageGeneration")
@Controller("imageGeneration")
export class ImageGenerationController {
  constructor(
    private readonly s3BucketService: S3BucketService,
    private readonly httpService: HttpService,
  ) {}

  @Get("style/general")
  async getStableDiffusionImage(@Body() body: GetImageDto) {
    try {
      const generatedImage = (
        await lastValueFrom(
          this.httpService.post(
            STABLE_DIFFUSION_URL,
            {
              inputs: body.prompt,
            },
            {
              responseType: "arraybuffer",
            },
          ),
        )
      )?.data
      const { url } = await this.s3BucketService.handleUploadBuffer(
        convertToBuffer(generatedImage),
      )
      return { success: true, url: url }
    } catch (e) {
      console.log(e)
    }
  }

  @Get("style/pixel-art")
  async getStableDiffusionPixelImage(@Body() body: GetImageDto) {
    try {
      const generatedImage = (
        await lastValueFrom(
          this.httpService.post(
            PIXEL_ART_URL,
            {
              inputs: body.prompt,
            },
            {
              responseType: "arraybuffer",
            },
          ),
        )
      )?.data
      const { url } = await this.s3BucketService.handleUploadBuffer(
        convertToBuffer(generatedImage),
      )
      return { success: true, url }
    } catch (e) {
      console.log(e)
    }
    return
  }
}
