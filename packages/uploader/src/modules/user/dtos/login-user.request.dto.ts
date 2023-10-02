import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserRequestDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNotEmpty()
  password: string;
}
