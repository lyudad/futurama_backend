import {
    Body,
    Controller,
    Get,
    Post,
    Req
} from '@nestjs/common';
import { Request } from 'express';

import { ContactsService } from './contacts.service';
import { UserEntity } from "../user.entity";
import { ContactsDTO } from '../dto/contactsDTO';

@Controller('user/contacts')
export class ContactsController {
    constructor(private readonly ContactsService: ContactsService) { }

    @Get()
    findOne(@Req() req: Request): Promise<UserEntity> {
        return this.ContactsService.findOne(req)
    }

    @Post()
    update(@Body() data: ContactsDTO, @Req() req: Request): string {
        this.ContactsService.update(req, data)
        return 'Contact info succefully updated!'
    }

    @Get('/all')
    findAll(): Promise<UserEntity[]> {
        return this.ContactsService.find()
    }
}
