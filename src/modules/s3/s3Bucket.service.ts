import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { Injectable } from "@nestjs/common"
import { randomBytes } from "crypto"

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
    const fileName = `${new Date().toUTCString()}-${randomBytes(16).toString(
      "hex",
    )}`
    const params = {
      Bucket: this.S3_BUCKET_NAME,
      //name for files
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }

    const command = new PutObjectCommand(params)
    try {
      const result = await this.s3BucketClient.send(command)
      return result
    } catch (e) {
      console.log(e)
    }
  }
}
