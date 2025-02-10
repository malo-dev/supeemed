import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { SchedulesModule } from './schedules/schedules.module';
import { employeesService } from './employees/employees.service';
import { employeesController } from './employees/employees.controller';
import { EmployeesModule } from './employees/employees.module';
import { ResidentModule } from './resident/resident.module';
import { LeaveRequestController } from './leave-request/leave-request.controller';
import { ReplacementsService } from './replacements/replacements.service';
import { LeaveRequestService } from './leave-request/leave-request.service';
import { LeaveRequestModule } from './leave-request/leave-request.module';
import { ReplacementsModule } from './replacements/replacements.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://agenceSupportMedic:30RfTL5d7Wn7cOnx@agencesupportmedic.t9r8f.mongodb.net/?retryWrites=true&w=majority&appName=agenceSupportMedic',
      synchronize: true, // à utiliser uniquement en developerment pas en production
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    DashboardModule,
    SchedulesModule,
    EmployeesModule,
    ResidentModule,
    LeaveRequestModule,
    ReplacementsModule,
  ],
  controllers: [
    DashboardController,
    employeesController,
    LeaveRequestController,
  ],
  providers: [
    DashboardService,
    employeesService,
    ReplacementsService,
    LeaveRequestService,
  ],
})
export class AppModule {}
