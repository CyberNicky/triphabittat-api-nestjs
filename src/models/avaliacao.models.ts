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

    @Column({name: 'id_destino', nullable: false, default: null})    
    idDestino: number;
    
    @Column({ name: 'id_user', nullable: false, default: null })
    idUser: number;

    // id_user
    @ManyToOne(() => PersonModel, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "id_user"})
    profile: PersonModel

    @ManyToOne(() => DestinoModel, (destino) => destino.avaliacoes, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "id_destino"})
    destino: DestinoModel
}