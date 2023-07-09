import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsString, IsOptional } from "class-validator"

export class CheckUserDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: "check create user email",
  })
  email?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: "check create user username",
  })
  username?: string
}
