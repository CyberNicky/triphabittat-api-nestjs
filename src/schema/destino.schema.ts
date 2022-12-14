import { IsString, MaxLength, IsBase64 } from 'class-validator';
export class DestinoSchema {
    @IsString()
    @MaxLength(255)
    name: string;
    
    @IsString()
    @MaxLength(255)
    descricao: string;

    @IsString()
    img_url: string;
}