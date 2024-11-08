// biome-ignore lint/style/useExportType: <explanation>
export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_KEY: string
      SECRET_KEY: string
      MINIO_HOST: string
      MINIO_PORT: number
      PORT: number
      GIFS_BUCKET: string
      WORKOUT_COVERS_BUCKET: string
    }
  }
}
