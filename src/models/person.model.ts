import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PersonModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 120})    
    name: string;
    @Column({length: 255})    
    email: string;
    @Column()    
    password: string;
    
}