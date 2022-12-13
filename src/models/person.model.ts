import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PersonModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 120})    
    name: string;
    @Column({length: 255})    
    email: string;
    @Column()    
    password: string;
}