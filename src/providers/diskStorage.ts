import fs from 'node:fs'
import path from 'node:path'
import uploadCongif from '@/configs/upload'

class DiskStorage {
  async saveFile(file: string) {
    const tmpPath = path.resolve(uploadCongif.TMP_FOLDER, file)
    const destPath = path.resolve(uploadCongif.UPLOADS_FOLDER, file)

    try {
      await fs.promises.access(tmpPath)
    } catch (error) {
      console.log(error)
      throw new Error(`File not found: ${tmpPath}`)
    }

    await fs.promises.mkdir(uploadCongif.UPLOADS_FOLDER, { recursive: true })
    await fs.promises.rename(tmpPath, destPath)
    return file
  }

  async deleteFile(file: string, type: 'tmp' | 'upload') {
    const pathFile =
      type === 'tmp' ? uploadCongif.TMP_FOLDER : uploadCongif.UPLOADS_FOLDER

    const filePath = path.resolve(pathFile, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

export { DiskStorage }
