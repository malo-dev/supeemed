import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;
  @Column()
  @Column({ nullable: true })
  role: string;

  @Column()
  password: string;
  @Column({ nullable: true })
  img: string;
  @CreateDateColumn()
  createdAt: Date; // Date de création de l'entité

  @UpdateDateColumn()
  updatedAt: Date; // Date de la dernière mise à jour
}
