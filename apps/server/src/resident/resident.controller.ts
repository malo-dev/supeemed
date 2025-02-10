/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
import { ObjectId } from 'typeorm';
import { Residence } from './resident.entity';

@Controller('resident')
export class ResidentController {
  constructor(private readonly leaveRequestService: ResidentService) {}

  @Get()
  findAll() {
    return this.leaveRequestService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.leaveRequestService.findOne(id);
  }
  @Post()
  create(@Body() employData: Partial<Residence>) {
    return this.leaveRequestService.create(employData);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Residence>) {
    return this.leaveRequestService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.leaveRequestService.delete(id);
  }
}
