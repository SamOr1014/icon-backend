import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from "./users/user.module"
import { DBModules } from "./db/prisma.module"
import { AuthModules } from "./auth/auth.module"
import { PostModule } from "./post/post.module"
import { ImageGenerationModule } from "./imageGeneration/image.module"
@Module({
  //import ConfigModule to use the .env file in nest app
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    DBModules,
    AuthModules,
    PostModule,
    ImageGenerationModule,
  ],
})
export class AppModule {}
