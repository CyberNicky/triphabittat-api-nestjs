import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}