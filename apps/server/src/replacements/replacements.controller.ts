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
import { ReplacementsService } from './replacements.service';
import { ObjectId } from 'typeorm';
import { Replacement } from './replacements.entity';

@Controller('replacements')
export class ReplacementsController {
  constructor(private readonly leaveRequestService: ReplacementsService) {}

  @Get()
  findAll() {
    return this.leaveRequestService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.leaveRequestService.findOne(id);
  }
  @Post()
  create(@Body() employData: Partial<Replacement>) {
    return this.leaveRequestService.create(employData);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Replacement>) {
    return this.leaveRequestService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.leaveRequestService.delete(id);
  }
}
