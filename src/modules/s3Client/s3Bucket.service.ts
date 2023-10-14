import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { Injectable } from "@nestjs/common"
import { randomBytes } from "crypto"
import { generateS3Url } from "./utils/generateS3Url"

@Injectable()
export class S3BucketService {
  private readonly S3_BUCKET_NAME = process.env.S3_BUCKET
  private readonly SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY
  private readonly ACCESS_KEY = process.env.S3_ACCESS_KEY
  private readonly AWS_REGION = process.env.S3_BUCKET_REGION

  private readonly s3BucketClient = new S3Client({
    region: this.AWS_REGION,
    credentials: {
      accessKeyId: this.ACCESS_KEY,
      secretAccessKey: this.SECRET_KEY,
    },
  })

  async uploadByS3(file: Express.Multer.File) {
    const fileName = `${new Date()
      .toISOString()
      .replace(".", "")}-${randomBytes(16).toString("hex")}`
    const params = {
      Bucket: this.S3_BUCKET_NAME,
      //name for files
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }

    const putCommand = new PutObjectCommand(params)
    try {
      await this.s3BucketClient.send(putCommand)
      return {
        url: generateS3Url(this.S3_BUCKET_NAME, this.AWS_REGION, fileName),
      }
    } catch (e) {
      console.log(e)
    }
  }
}
