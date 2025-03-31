import { IsEmail, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;

  constructor(
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    username: string = '',
    password: string = ''
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
