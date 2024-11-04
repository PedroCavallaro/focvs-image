import { Controller, Get, Param, Post, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { Response } from 'express'
import { CanvasService } from './canvas/canvas.service'

@Controller('v1')
export class AppController {
  constructor(private readonly service: AppService,
    private readonly canvasService: CanvasService
  ) {}

  @Get(':gif')
  async getGif(@Param('gif') gifName: string, @Res() res: Response) {
    const gifStream = await this.service.get(gifName)

    res.setHeader('Content-Type', 'image/gif')

    gifStream.pipe(res)
  }

  @Post()
  async saveGif() {
    await this.service.save()
  }

  @Post('canvas')
  async getWorkoutCanvas() {
    await this.canvasService.generateWorkoutCover()
  }

}


