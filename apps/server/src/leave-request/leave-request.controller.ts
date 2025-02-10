import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { ObjectId } from 'typeorm';
import { LeaveRequest } from './leave-request.entity';

@Controller('leaverequest')
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Get()
  findAll() {
    return this.leaveRequestService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.leaveRequestService.findOne(id);
  }
  @Post()
  create(@Body() employData: Partial<LeaveRequest>) {
    return this.leaveRequestService.create(employData);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<LeaveRequest>) {
    return this.leaveRequestService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.leaveRequestService.delete(id);
  }
}
