import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employe } from './employees.entity';
import { employeesService } from './employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employe])], // Ajoutez le repository ici
  providers: [employeesService],
  exports: [TypeOrmModule], // Exportez le service si utilisé dans d'autres modules
})
export class EmployeesModule {}
