import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from "./users/user.module"
import { DBModules } from "./db/prisma.module"
@Module({
  //import ConfigModule to use the .env file in nest app
  imports: [ConfigModule.forRoot(), UserModule, DBModules],
})
export class AppModule {}
