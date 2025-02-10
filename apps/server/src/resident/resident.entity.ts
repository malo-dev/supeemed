import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

@Entity('residences')
export class Residence {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string; // Nom de la résidence

  @Column()
  location: string; // Emplacement de la résidence

  @Column()
  requestingEmployeeId: number; // ID de l'employé qui demande la résidence

  @Column()
  requestingEmployeeName: string; // Nom de l'employé qui demande la résidence

  @CreateDateColumn()
  createdAt: Date; // Date de création de l'enregistrement

  @UpdateDateColumn()
  updatedAt: Date; // Date de dernière mise à jour de l'enregistrement
}
