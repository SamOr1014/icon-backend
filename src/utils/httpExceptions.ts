import { HttpException, HttpStatus } from "@nestjs/common"

export class HTTPStatus {
  ResMessage: string
  constructor(customMessage?: string) {
    this.ResMessage = customMessage?.toUpperCase()
  }

  notFound() {
    const DEFAULT_MESSAGE = "NOT FOUND"
    return new HttpException(
      { message: this.ResMessage ?? DEFAULT_MESSAGE, success: false },
      HttpStatus.NOT_FOUND,
    )
  }

  unauthorized() {
    const DEFAULT_MESSAGE = "UNAUTHORIZED"
    return new HttpException(
      { message: this.ResMessage ?? DEFAULT_MESSAGE, success: false },
      HttpStatus.UNAUTHORIZED,
    )
  }

  badRequest() {
    const DEFAULT_MESSAGE = "BAD REQUEST"
    return new HttpException(
      { message: this.ResMessage ?? DEFAULT_MESSAGE, success: false },
      HttpStatus.BAD_REQUEST,
    )
  }
}
