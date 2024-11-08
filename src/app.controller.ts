import { Body, Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { CanvasService } from './canvas/canvas.service'
import { StorageService } from './storage/storage.service'
import { CreateWorkoutCanvasDto } from './dto/create-workout-canvas.dto'
import { EventPattern } from '@nestjs/microservices'

@Controller('v1')
export class AppController {
  constructor(
    private readonly storage: StorageService,
    private readonly canvasService: CanvasService
  ) {}

  @Get(':gif')
  async getGif(@Param('gif') gifName: string, @Res() res: Response) {
    const gifStream = await this.storage.get({
      bucket: process.env.GIFS_BUCKET,
      key: gifName
    })

    res.setHeader('Content-Type', 'image/gif')

    gifStream.pipe(res)
  }

  @Get('workout/:cover')
  async getWorkoutCover(@Param('cover') cover: string, @Res() res: Response) {
    const workoutCoverStream = await this.storage.get({
      bucket: process.env.WORKOUT_COVERS_BUCKET,
      key: cover
    })

    res.setHeader('Content-Type', 'image/gif')

    workoutCoverStream.pipe(res)
  }

  @EventPattern('workout_created')
  async getWorkoutCanvas(@Body() createWorkoutCanvasDto: CreateWorkoutCanvasDto) {
    await this.canvasService.generateWorkoutCover(createWorkoutCanvasDto)
  }
}
