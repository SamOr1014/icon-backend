import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "login email",
  })
  email: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "login password",
  })
  password: string
}
