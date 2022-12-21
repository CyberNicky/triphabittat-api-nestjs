import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AvaliacaoModel } from './avaliacao.models';

@Entity()
export class PersonModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 255 })
  name: string;
  @Column({ length: 255 })
  email: string;
  @Column()
  password: string;

  
  @OneToMany(() => AvaliacaoModel, (avaliacao) => avaliacao.profile)
  avaliacoes: AvaliacaoModel[];
}
