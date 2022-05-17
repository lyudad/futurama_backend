import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { UserEntity } from "../user.entity";
import { ContactsDTO } from "../dto/contactsDTO";
import { Request } from 'express';

@Injectable()
export class ContactsService {
  static extractId(req: Request): string {
    return Object.values(Object.assign({}, jwt.decode(req.headers.authorization.slice(7))))[0]
  }
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  find(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(@Req() req: Request): Promise<UserEntity> {
    return this.usersRepository.findOne(ContactsService.extractId(req));
  }

  async update(@Req() req: Request, data: ContactsDTO): Promise<void> {
    await this.usersRepository.update(ContactsService.extractId(req), data);
  }
}