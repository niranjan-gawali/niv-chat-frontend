import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;

  constructor(username: string = '', password: string = '') {
    this.username = username;
    this.password = password;
  }
}
