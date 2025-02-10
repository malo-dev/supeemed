import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectId,
} from 'typeorm';

@Entity('employes') // Nom de la collection ou table
export class Employe {
  @ObjectIdColumn()
  id: ObjectId; // Identifiant unique

  @Column()
  nom: string; // Nom de l'employé

  @Column()
  prenom: string; // Prénom de l'employé

  @Column()
  email: string; // Email de l'employé

  @Column()
  telephone: string; // Numéro de téléphone de l'employé

  @Column()
  department: string; // Département de l'employé

  @Column()
  position: string; // Poste occupé par l'employé

  @Column('array') // Définit un tableau pour les plannings
  plannings: {
    date: string; // Date du planning
    tasks: {
      time: string; // Heure de la tâche
      description: string; // Description de la tâche
    }[];
  }[];

  @CreateDateColumn()
  createdAt: Date; // Date de création de l'entité

  @UpdateDateColumn()
  updatedAt: Date; // Date de la dernière mise à jour
}
