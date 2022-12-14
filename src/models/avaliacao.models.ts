import { join } from "path";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DestinoModel } from "./destino.models";
import { PersonModel } from "./person.model";
@Entity()
export class AvaliacaoModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255})    
    conteudo: string;

    @Column({name: 'id_destino'})    
    idDestino: string;
    
    @Column({name: 'id_user'})
    idUser: string;

    // id_user
    @OneToOne(() => PersonModel)
    @JoinColumn({name: "id_user"})
    profile: PersonModel

    @ManyToOne(() => DestinoModel, (destino) => destino.avaliacoes)
    @JoinColumn({name: "id_destino"})
    destino: DestinoModel
}