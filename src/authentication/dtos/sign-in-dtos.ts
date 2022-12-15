import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsDefined({ message: 'O campo do E-mail deve ser válido!' })
  @IsEmail({}, { message: 'O campo do E-mail deve ser válido!' })
  @IsNotEmpty({ message: 'O campo do E-mail não pode ser vazio!' })
  readonly email: string;

  @IsDefined({ message: 'O campo da Senha deve ser válido!' })
  @IsString({ message: 'O campo de Senha deve ser uma string!' })
  @IsNotEmpty({ message: 'O campo de Senha não pode ser vazio!' })
  readonly password: string;
}