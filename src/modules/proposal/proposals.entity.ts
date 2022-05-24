import {
    Column,    
    Entity,
    PrimaryGeneratedColumn,
  
  } from 'typeorm';
  

  
  @Entity('proposals')
  export class ProposalsEntity {
    
    @PrimaryGeneratedColumn()
    id: number;    
   
    @Column("varchar", { length: 500 })
    cv: string;
    
    @Column()
    price: number;
  

  }
  