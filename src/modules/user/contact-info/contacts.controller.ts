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
        try {
            return this.ContactsService.findOne(req)
        }
        catch { throw new Error() }

    }

    @Post()
    update(@Body() data: ContactsDTO, @Req() req: Request): string {
        try {
            this.ContactsService.update(req, data)
            return 'Contact info succefully updated!'
        } catch {
            throw new Error('Something went wrong')
        }
    }

    @Get('/all')
    findAll(): Promise<UserEntity[]> {
        try { return this.ContactsService.find() }
        catch { throw new Error() }
    }
}