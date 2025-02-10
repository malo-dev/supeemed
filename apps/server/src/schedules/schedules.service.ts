/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, ObjectId, Repository } from 'typeorm';
import { Planning } from './schedules.entity';
import { error } from 'console';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Planning)
    private readonly planningRepository: Repository<Planning>,
  ) {}

  async findAll(): Promise<Planning[]> {
    return this.planningRepository.find();
  }

  async findOne(id: any): Promise<Planning | any> {
    const result: any = await this.planningRepository.findOne(id);
    if (!result) throw new BadRequestException({ error: 'Data Not found' });
    return {
      status: HttpStatus.OK,
      messagge: 'Data Fecth successfully',
      totalData: result && result.length ? result.length : 0,
      result: result,
    };
  }

  async findAllPlanning(employeeId: any): Promise<Planning | any> {
    const result: any = await this.planningRepository.find({
      where: { employeeId: employeeId },
    });
    if (!result) throw new BadRequestException({ error: 'Data Not found' });
    return {
      status: HttpStatus.OK,
      messagge: 'Data Fecth successfully',
      totalData: result && result.length ? result.length : 0,
      result: result,
    };
  }

  async create(planning: Partial<Planning>) {
    const updateObject = await this.planningRepository.save(planning);
    if (!updateObject)
      throw new BadRequestException({ error: 'Data Not Found' });

    return {
      status: HttpStatus.OK,
      messagge: 'Data create  successfully',
      result: updateObject,
    };
  }

  async update(id: any, updateData: Partial<Planning>) {
    const updateDataItem = await this.planningRepository.update(
      `${id}`,
      updateData,
    );
    if (!updateDataItem)
      throw new BadRequestException({ error: 'Data not found' });

    return {
      status: HttpStatus.OK,
      messagge: 'Date Update sucessfully',
      result: updateData,
      dataStreamChecked: updateDataItem,
    };
  }

  async delete(id: string) {
    const dateDeleteItem = await this.planningRepository.delete(`${id}`);
    return {
      status: HttpStatus.OK,
      message: 'Items deleted with sucess',
      result: id,
    };
  }
}
