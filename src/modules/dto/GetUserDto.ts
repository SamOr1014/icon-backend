import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber } from "class-validator"

export class GetUserDto {
  @IsNotEmpty()
  //transform runs before validation
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "get user id",
  })
  id: number
}
