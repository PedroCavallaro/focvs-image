import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app
    .listen(process.env.APP_PORT ?? 8888)
    .then(() => Logger.log(`App runing on ${process.env.APP_PORT}`))
}
bootstrap()
