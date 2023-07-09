import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({
    message: "Missing Email",
  })
  @ApiProperty({
    type: String,
    description: "login email",
  })
  email: string

  @IsNotEmpty({
    message: "Missing Password",
  })
  @ApiProperty({
    type: String,
    description: "login password",
  })
  password: string
}
