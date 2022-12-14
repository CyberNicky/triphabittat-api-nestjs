import { IsString, MaxLength} from 'class-validator';
import { BaseEntity } from 'typeorm';
import { PersonSchema } from './person.schema';
export class AvaliacaoSchema extends BaseEntity {
    @IsString()
    @MaxLength(120)
    conteudo: string;
    
    id_destino: number;

    id_user: number;
}