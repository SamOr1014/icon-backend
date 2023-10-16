export const generateS3Url = (
  bucketName: string,
  region: string,
  fileName: string,
) => {
  return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`
}
