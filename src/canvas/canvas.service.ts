import * as sharp from 'sharp'
import * as fs from 'node:fs/promises'
import { Injectable } from '@nestjs/common'
import { join } from 'node:path'
import { CanvasHelper } from './helpers/canvas.helper'
import { StorageService } from 'src/storage/storage.service'
import { CreateWorkoutCanvasDto } from 'src/dto/create-workout-canvas.dto'

@Injectable()
export class CanvasService {
  constructor(private readonly storage: StorageService) {}

  private readonly helper = new CanvasHelper()

  async generateWorkoutCover({ muscles, workoutId }: CreateWorkoutCanvasDto) {
    try {
      const key = `${workoutId}.png`
      const picturesAmount = Math.min(muscles.length, 4)

      this.helper.getMeasures(picturesAmount)

      const { imagesToResize, outputHeight, outputWidth } = await this.getMuscleImages(
        picturesAmount,
        muscles
      )
      console.log(imagesToResize)

      const resizedImages = await Promise.all(imagesToResize)

      const composite = this.helper.getComposite(resizedImages)

      const outputImagePath = join(__dirname, '..', '..', `temp/${key}`)

      await sharp({
        create: {
          width: outputWidth,
          height: outputHeight,
          channels: 3,
          background: { r: 255, g: 255, b: 255 }
        }
      })
        .composite(composite)
        .toFile(join(__dirname, '..', '..', `temp/${key}`))

      await this.storage.save({
        key,
        image: outputImagePath,
        bucket: process.env.WORKOUT_COVERS_BUCKET
      })

      fs.rm(join(__dirname, '..', '..', outputImagePath))
    } catch (error) {
      console.log(error)
    }
  }

  async getMuscleImages(picturesAmount: number, muscles: string[]) {
    const imagesPaths = []

    for (let i = 0; i < picturesAmount; i++) {
      imagesPaths.push(join(__dirname, '..', '..', `images/${muscles[i]}.png`))
    }

    const images = await Promise.all(imagesPaths.map((path) => sharp(path)))

    const outputWidth = this.helper.sizes.width * 2
    const outputHeight = this.helper.sizes.height * 2

    const imagesToResize = []

    const sizes = this.helper.getImagesSizeByMuscleAmount()

    for (let i = 0; i < images.length; i++) {
      if (i === 2) {
        imagesToResize.push(
          images[i].resize(this.helper.sizes.width * 2, this.helper.sizes.height).toBuffer()
        )

        continue
      }

      const image = images[i]
        .resize(sizes[picturesAmount].width, sizes[picturesAmount].height)
        .toBuffer()

      imagesToResize.push(image)
    }

    return {
      outputWidth,
      outputHeight,
      imagesToResize
    }
  }
}
