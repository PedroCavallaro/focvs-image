import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as Minio from 'minio'
import * as fs from 'node:fs'

@Injectable()
export class StorageService extends Minio.Client {
  constructor() {
    super({
      endPoint: process.env.MINIO_HOST,
      port: Number(process.env.MINIO_PORT),
      accessKey: process.env.ACCESS_KEY,
      secretKey: process.env.SECRET_KEY,
      useSSL: false
    })
  }

  async get({ bucket, key }: { bucket: string; key: string }) {
    try {
      const gif = await this.getObject(bucket, key)

      return gif
    } catch (error) {
      throw new HttpException('Gif not found', HttpStatus.NOT_FOUND)
    }
  }

  async save({ bucket, image, key }: { bucket: string; key: string; image: Buffer | string }) {
    return await this.putObject(bucket, key, fs.createReadStream(image))
  }
}
