import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import uploadConfig from '@/configs/upload'
import { DiskStorage } from '@/providers/diskStorage'
import { AppError } from '@/utils/AppError'

class UploadsController {
  async create(request: Request, response: Response) {
    const diskStorage = new DiskStorage()
    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, { message: 'File is required' }),
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
              {
                message:
                  'Invalid file format, allowed formats: ' +
                  uploadConfig.ACCEPTED_IMAGE_TYPES,
              }
            ),
          size: z
            .number()
            .positive()
            .refine(
              (size) => size <= uploadConfig.MAX_FILE_SIZE,
              `The file exceeds the maximum size of ${uploadConfig.MAX_SIZE}`
            ),
        })
        .passthrough()

      const file = fileSchema.parse(request.file)
      const filename = await diskStorage.saveFile(file.filename)

      response.json({ filename })
    } catch (error) {
      if (error instanceof ZodError) {
        if (request.file) {
          await diskStorage.deleteFile(request.file.filename, 'tmp')
        }
        throw new AppError(error.issues[0].message)
      }
      throw error
    }
  }
}

export { UploadsController }
