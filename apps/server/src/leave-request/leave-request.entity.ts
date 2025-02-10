import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';

@Entity('LeaveRequest ') // Table ou collection pour les demandes de congé
export class LeaveRequest {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  startDate: Date; // Date de début du congé

  @Column()
  endDate: Date; // Date de fin du congé

  @Column({ default: 'pending' }) // Statut de la demande : pending, approved, rejected
  status: string;

  @Column()
  employeeName: string; // Nom de l'employé ayant demandé le congé

  @Column()
  employeeId: string; // ID de l'employé ayant demandé le congé (id unique de l'employé)

  @Column()
  reason: string; // Raison du congé

  @CreateDateColumn()
  createdAt: Date; // Date de création de la demande

  @UpdateDateColumn()
  updatedAt: Date; // Date de dernière mise à jour
}
