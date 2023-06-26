import { Controller, Get, HttpCode, Req } from "@nestjs/common"
import { AppService } from "../services/app.service"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(201)
  getHello(@Req() req: Request): string {
    console.log("this is get hello and it req body", req.body)
    return this.appService.getHello()
  }
}
