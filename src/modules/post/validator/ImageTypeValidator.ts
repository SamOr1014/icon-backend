import { FileValidator } from "@nestjs/common"

export interface CustomUploadTypeValidatorOptions {
  fileType: string[]
}

export class ImageTypeValidator extends FileValidator {
  private allowedMimeTypes: string[]
  constructor(
    protected readonly validationOptions: CustomUploadTypeValidatorOptions,
  ) {
    super(validationOptions)
    this.allowedMimeTypes = this.validationOptions.fileType
  }
  public isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    if (!file || !this.allowedMimeTypes.includes(file.mimetype)) return false
    return true
  }
  public buildErrorMessage(): string {
    throw new Error("Unsupported type of file or no file uploaded")
  }
}
