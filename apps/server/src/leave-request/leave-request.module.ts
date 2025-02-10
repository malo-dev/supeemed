/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from './leave-request.entity';
import { LeaveRequestService } from './leave-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest])], // Ajoutez le repository ici
  providers: [LeaveRequestService],
  exports: [TypeOrmModule], // Exportez le service si utilisé dans d'autres modules
})
export class LeaveRequestModule {}
