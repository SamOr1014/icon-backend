import { NestFactory } from "@nestjs/core"
import { AppModule } from "./modules/app.module"
import { PrismaService } from "./modules/db/prisma.service"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import helmet from "helmet"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const prismaService = app.get(PrismaService)
  app.use(helmet())
  app.use(cookieParser())
  app.enableCors({ origin: process.env.ICON_FRONTEND_URL, credentials: true })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  SwaggerModule.setup(
    "doc",
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle("icon-backend")
        .setDescription("Backend route for icon site")
        .setVersion("1.0")
        .build(),
    ),
  )

  await prismaService.enableShutdownHooks(app)

  await app.listen(process.env.SERVER_PORT || 3000)
  //TODO : ADD LOGGER
  console.log("Listening at port : ", process.env.SERVER_PORT)
}
bootstrap()
