import { compare, hash } from "bcrypt"

const saltRound = 10
export const hashString = async (data: string): Promise<string> => {
  return hash(data, saltRound)
}

export const compareHash = async (
  data: string,
  hash: string,
): Promise<boolean> => {
  return compare(data, hash)
}
