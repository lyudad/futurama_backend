import {
    
    Controller,
    Post,
  
  } from '@nestjs/common';

  

  @Controller('/proposal')
  export class ProposalsController {
    
    
    @Post()    
    saiOk(): string {
      return 'OK';
    }
  }
  