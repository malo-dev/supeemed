import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employe } from './employees.entity';

@Injectable()
export class employeesService {
  constructor(
    @InjectRepository(Employe)
    private readonly employeRepository: Repository<Employe>,
  ) {}

  async findAll(): Promise<Promise<Employe> | any> {
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

  async create(dataobject: Partial<Employe>) {
    const data = await this.employeRepository.save(dataobject);
    if (data)
      return {
        status: HttpStatus.OK,
        result: data,
        message: 'data is creadted',
      };
  }

  async update(id: any, dataObject: Partial<Employe>) {
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
