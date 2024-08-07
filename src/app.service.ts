import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { StorageService } from './storage/storage.service'
import * as fs from 'node:fs'

@Injectable()
export class AppService {
  constructor(private readonly storage: StorageService) {}

  async get(gifName: string) {
    try {
      const gif = await this.storage.getObject(process.env.BUCKET_NAME, gifName)

      return gif
    } catch (error) {
      throw new HttpException('Gif not found', HttpStatus.NOT_FOUND)
    }
  }

  async save() {
    const res = await this.storage.putObject(
      process.env.BUCKET_NAME,
      'supino.gif',
      fs.createReadStream('./src/supino.gif')
    )
  }
}
