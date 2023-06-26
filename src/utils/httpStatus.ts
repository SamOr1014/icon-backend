import { HttpException, HttpStatus } from "@nestjs/common"

export class HTTPStatusCodeRes {
  ResMessage: string
  constructor(message: string) {
    this.ResMessage = message.toUpperCase()
  }

  unauthorized() {
    return new HttpException(this.ResMessage, HttpStatus.UNAUTHORIZED)
  }
}
