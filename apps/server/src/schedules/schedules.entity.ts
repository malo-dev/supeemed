import { Employe } from 'src/employees/employees.entity';
import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectId,
  ManyToOne,
} from 'typeorm';

@Entity('plannings') // Nom de la collection ou table
export class Planning {
  @ObjectIdColumn()
  id: ObjectId; // Identifiant unique

  @Column()
  employeeId: string; // Identifiant de l'employé (lié à une entité Employee)

  @Column()
  employeeName: string; // Nom de l'employé

  @Column()
  department: string; // Département de l'employé

  @Column()
  position: string; // Poste occupé par l'employé
  @ManyToOne(() => Employe, (employe) => employe.plannings, { nullable: false })
  employe: Employe; // Référence à l'entité Employe

  @Column('array')
  schedule: ScheduleEntry[]; // Liste des jours/horaires du planning

  @CreateDateColumn()
  createdAt: Date; // Date de création de l'entité

  @UpdateDateColumn()
  updatedAt: Date; // Date de la dernière mise à jour
}

export class ScheduleEntry {
  @Column()
  date: string; // Date du planning (format YYYY-MM-DD)

  @Column()
  startTime: string; // Heure de début (format HH:mm)

  @Column()
  endTime: string; // Heure de fin (format HH:mm)

  @Column('array')
  breaks: BreakEntry[]; // Liste des pauses

  @Column()
  location: string; // Lieu du travail (exemple : bureau ou site)

  @Column()
  shiftType: string; // Type de shift (matin, soir, nuit)

  @Column()
  status: string; // Statut (exemple : Confirmé, En attente, Annulé)
}

export class BreakEntry {
  @Column()
  startTime: string; // Heure de début de la pause

  @Column()
  endTime: string; // Heure de fin de la pause
}
