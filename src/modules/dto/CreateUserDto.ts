import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "create username",
  })
  username: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: "create email",
  })
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(8)
  @ApiProperty({
    type: String,
    description: "create password",
  })
  password: string
}
