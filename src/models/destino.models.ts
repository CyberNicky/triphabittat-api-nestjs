import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AvaliacaoModel } from './avaliacao.models';
@Entity()
export class DestinoModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;
  @Column({ length: 120 })
  state: string;

  @Column()
  descricao: string;

  @Column({ name: 'img_url' })
  imgUrl: string;

  @OneToMany(() => AvaliacaoModel, (avaliacao) => avaliacao.destino)
  avaliacoes: AvaliacaoModel[];
}
