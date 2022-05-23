import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ProfileEntity } from '../profile/entities/profile.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column({type: 'text', nullable: true})
  phone: string;

  @Column({type: 'text', nullable: true})
  photo: string;

  @Column({
    type: 'enum',
    enum: ['freelancer', 'jobOwner'],
    nullable: true,
  })
  role: string;

  @OneToOne(() => ProfileEntity, profile => profile.user)
  @JoinColumn()
  profile: ProfileEntity;

  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponceObject(showToken = true): object {
    const { firstName, lastName, email, token, phone, photo } = this;
    const responceObject = { user: { firstName, lastName, email, phone, photo }, token };
    if (showToken) {
      responceObject.token = token;
    }
    return responceObject;
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token(): string {
    const { id, email } = this;
    return jwt.sign(
      {
        id,
        email
      },
      process.env.SECRET,
      { expiresIn: '7d' }
    );
  }
}
