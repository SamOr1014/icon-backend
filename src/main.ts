import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { PrismaService } from "./services/prisma.service"
import { ValidationPipe } from "@nestjs/common"

const PORT = process.env["SERVER_PORT"] || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const prismaService = app.get(PrismaService)

  app.useGlobalPipes(new ValidationPipe())

  await prismaService.enableShutdownHooks(app)

  await app.listen(PORT)
  //TODO : ADD LOGGER
  console.log("Listening at port : ", PORT)
}
bootstrap()
