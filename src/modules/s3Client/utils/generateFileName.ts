import { randomBytes } from "crypto"

export const generateS3FileName = () =>
  `${new Date().toISOString().replace(".", "")}-${randomBytes(16).toString(
    "hex",
  )}`
