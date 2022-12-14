import { IsString, MaxLength} from 'class-validator';
import { BaseEntity } from 'typeorm';
import { PersonSchema } from './person.schema';
export class AvaliacaoSchema  {
    @IsString()
    @MaxLength(255)
    conteudo: string;
    
    idDestino: number;

    idUser: number;
}