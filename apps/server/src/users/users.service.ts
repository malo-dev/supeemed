import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly useRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.useRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.useRepository.findOne({ where: { username } });
  }

  async findOne(id: string): Promise<User> {
    return this.useRepository.findOneBy({ id });
  }

  async findAll() {
    return this.useRepository.find();
  }

  // async update(id: string, user: Partial<User>) {
  //   const dataArray = await this.useRepository.update(`${id}`, user);
  //   return {
  //     status: HttpStatus.OK,
  //     data: dataArray,
  //   };
  // }

  async update(id: any, updateData: Partial<User>) {
    const updateDataItem = await this.useRepository.update(`${id}`, updateData);
    if (!updateDataItem)
      throw new BadRequestException({ error: 'Data not found' });

    return {
      status: HttpStatus.OK,
      messagge: 'Date Update sucessfully',
      result: updateData,
      dataStreamChecked: updateDataItem,
    };
  }

  async remove(id: string) {
    const dateDeleteItem = await this.useRepository.delete(`${id}`);
    return {
      status: HttpStatus.OK,
      message: 'Items deleted with sucess',
      result: dateDeleteItem,
    };
  }
}
