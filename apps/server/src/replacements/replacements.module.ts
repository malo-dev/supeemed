/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Replacement } from './replacements.entity';
import { ReplacementsController } from './replacements.controller';
import { ReplacementsService } from './replacements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Replacement])],
  controllers: [ReplacementsController], // Ajoutez le repository ici
  providers: [ReplacementsService],
  exports: [TypeOrmModule], // Exportez le service si utilisé dans d'autres modules
})
export class ReplacementsModule {}
