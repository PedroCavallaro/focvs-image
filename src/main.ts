import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const eventBaseApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 8889
    }
  })
  const app = await NestFactory.create(AppModule)

  app.listen(process.env.PORT ?? 8888).then(() => Logger.log(`App runing on ${process.env.PORT}`))

  eventBaseApp.listen()
}
bootstrap()
