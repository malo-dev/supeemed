import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planning } from './schedules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planning])],
  providers: [SchedulesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
