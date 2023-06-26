import { Module } from "@nestjs/common"
import { AppController } from "./controllers/app.controller"
import { AppService } from "./services/app.service"
import { ConfigModule } from "@nestjs/config"
import { UserService } from "./services/user.service"
import { PrismaService } from "./services/prisma.service"
import { UserController } from "./controllers/user.controller"
import { AuthController } from "./controllers/auth.controller"
@Module({
  //import ConfigModule to use the .env file in nest app
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
