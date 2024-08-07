import * as Minio from 'minio'

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
}
