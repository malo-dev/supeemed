import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { employeesService } from './employees.service';
import { ObjectId } from 'typeorm';
import { Employe } from './employees.entity';

@Controller('employees')
export class employeesController {
  constructor(private readonly employeService: employeesService) {}

  @Get()
  findAll() {
    return this.employeService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.employeService.findOne(id);
  }
  @Post()
  create(@Body() employData: Partial<Employe>) {
    return this.employeService.create(employData);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Employe>) {
    return this.employeService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeService.delete(id);
  }
}
