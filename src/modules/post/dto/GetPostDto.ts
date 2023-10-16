import { IsNumber } from "class-validator"

export class GetPostDto {
  @IsNumber()
  id: number
}
