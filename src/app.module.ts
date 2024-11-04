import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { StorageModule } from './storage/storage.module'
import { AppService } from './app.service'
import { CanvasModule } from './canvas/canvas.module'

@Module({
  imports: [
    StorageModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CanvasModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
