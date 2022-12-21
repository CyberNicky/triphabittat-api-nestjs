import { IsString, MaxLength, IsBase64 } from 'class-validator';
export class DestinoSchema {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  state: string;

  @IsString()
  @MaxLength(255)
  descricao: string;

  @IsString()
  //   @IsBase64()
  imgUrl: string;
}
