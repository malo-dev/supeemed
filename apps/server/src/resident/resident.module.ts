/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentService } from './resident.service';
import { ResidentController } from './resident.controller';
import { Residence } from './resident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Residence])],
  providers: [ResidentService],
  controllers: [ResidentController],
  exports: [TypeOrmModule], // Exportez le service si utilisé dans d'autres modules
})
export class ResidentModule {}
