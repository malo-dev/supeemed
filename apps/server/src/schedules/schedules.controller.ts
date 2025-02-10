import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { Planning } from './schedules.entity';
import { ObjectId } from 'typeorm';

@Controller('plannings')
export class SchedulesController {
  constructor(private readonly planningsService: SchedulesService) {}
  @Get()
  findAll() {
    return this.planningsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return this.planningsService.findOne(id);
  }

  @Get('/all/:id')
  async findAllPlanning(@Param('id') id: string) {
    return this.planningsService.findAllPlanning(id);
  }
  @Post()
  create(@Body() planning: Partial<Planning>) {
    return this.planningsService.create(planning);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Planning>) {
    return this.planningsService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.planningsService.delete(id);
  }
}
