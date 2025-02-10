/* eslint-disable prettier/prettier */
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Replacement } from './replacements.entity';

@Injectable()
export class ReplacementsService {
  constructor(
    @InjectRepository(Replacement)
    private readonly employeRepository: Repository<Replacement>,
  ) {}

  async findAll(): Promise<Promise<Replacement> | any> {
    const data = await this.employeRepository.find();
    if (!data) throw new BadRequestException({ error: 'data not found' });

    return {
      status: HttpStatus.OK,
      result: data,
      message: 'all date is getted with sucess',
    };
  }

  async findOne(id: any): Promise<any> {
    const data = await this.employeRepository.findOne(id);
    if (!data) throw new BadRequestException({ error: 'Data not found ' });
    return {
      status: HttpStatus.OK,
      result: data,
      message: 'getone is sucess',
    };
  }

  async create(leaveRequestData: Partial<Replacement>) {
    console.log('LeaveRequest data:', leaveRequestData); // Vérifiez les données ici
    try {
      const leaveRequest = this.employeRepository.create(leaveRequestData);
      await this.employeRepository.save(leaveRequest);
      return leaveRequest;
    } catch (error) {
      console.error('Error during LeaveRequest creation:', error);
      throw error;
    }
  }

  async update(id: any, dataObject: Partial<Replacement>) {
    const dataUpdate = await this.employeRepository.update(`${id}`, dataObject);

    if (dataObject) {
      return {
        status: HttpStatus.OK,
        result: dataObject,
        checkStream: dataUpdate,
      };
    } else {
      throw new BadRequestException({ error: 'no data is founud ' });
    }
  }

  async delete(id: string) {
    const datadelete = await this.employeRepository.delete(`${id}`);
    return {
      message: 'data is deleted ',
      status: HttpStatus.OK,
      result: datadelete,
    };
  }
}
