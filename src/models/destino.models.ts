import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AvaliacaoModel } from "./avaliacao.models";
@Entity()
export class DestinoModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120})    
    name: string;

    @Column()    
    descricao: string;

    @Column()    
    img_url: string; 
    
    @OneToMany(() => AvaliacaoModel, (avaliacao) => avaliacao.destino)
    avaliacoes: AvaliacaoModel[]
}