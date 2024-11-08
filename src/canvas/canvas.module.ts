import { Module } from '@nestjs/common'
import { CanvasService } from './canvas.service'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [StorageModule],
  providers: [CanvasService],
  exports: [CanvasService]
})
export class CanvasModule {}
