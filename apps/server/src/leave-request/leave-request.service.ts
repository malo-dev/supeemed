/* eslint-disable prettier/prettier */
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest } from './leave-request.entity';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly employeRepository: Repository<LeaveRequest>,
  ) {}

  async findAll(): Promise<Promise<LeaveRequest> | any> {
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

  async create(leaveRequestData: Partial<LeaveRequest>) {
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

  async update(id: any, dataObject: Partial<LeaveRequest>) {
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
