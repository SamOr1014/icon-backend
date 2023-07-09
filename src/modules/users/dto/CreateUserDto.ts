import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty({ message: "Username is required" })
  @IsString()
  //TODO: enable bottom
  // @Length(8, 20)
  @ApiProperty({
    type: String,
    description: "create username",
  })
  username: string

  @IsNotEmpty({
    message: "Email is required",
  })
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: "create email",
  })
  email: string

  @IsNotEmpty({
    message: "Password is required",
  })
  @IsString()
  @Length(8)
  @ApiProperty({
    type: String,
    description: "create password",
  })
  password: string
}
