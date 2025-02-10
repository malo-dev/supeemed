import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectId,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('replacements')
export class Replacement {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  requestingEmployeeId: number; // ID de l'employé demandant le remplacement

  @Column({ nullable: true })
  requestingEmployeeName: string; // Nom de l'employé demandant le remplacement

  @Column()
  replacingEmployeeId: number; // ID de l'employé qui remplace

  @Column({ nullable: true })
  replacingEmployeeName: string; // Nom de l'employé qui remplace
  @CreateDateColumn()
  createdAt: Date; // Date de création de la demande

  @UpdateDateColumn()
  updatedAt: Date; // Date de dernière mise à jour
}
