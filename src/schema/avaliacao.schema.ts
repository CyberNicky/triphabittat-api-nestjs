import { IsString, MaxLength} from 'class-validator';
import { PersonSchema } from './person.schema';
export class AvaliacaoSchema {
    @IsString()
    @MaxLength(120)
    conteudo: string;
    
    @IsString()
    id_destino: string;

    @IsString()
    id_user: string;
}