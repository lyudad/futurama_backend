import {
    Controller,
    Get,
    Param
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { UserEntity } from "../user.entity";



@Controller('contacts')
export class ContactsController {
    constructor(private readonly ContactsService: ContactsService) { }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<UserEntity> {
        return this.ContactsService.findOne(id);
    }
    @Get()
    findAll(): Promise<UserEntity[]> {
        return this.ContactsService.findAll();
    }
}
