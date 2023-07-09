import { User } from "@prisma/client"
import { compareHash } from "@src/utils/hashing"
import { HTTPStatus } from "src/utils/httpExceptions"

export const loginVerification = async (user: User, password: string) => {
  if (!user) {
    throw new HTTPStatus("Invalid Credentials. No Such User").unauthorized()
  }
  const correctPassword = await compareHash(password, user.password)
  if (!correctPassword) {
    throw new HTTPStatus("Invalid Credentials. Wrong Password").unauthorized()
  }
}
