import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ProfileEntity } from '../profile/entities/profile.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  phone: string;

  @Column('text')
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponceObject(showToken = true) {
    const { firstName, lastName, email, token, phone, photo } = this;
    const responceObject = { user: { firstName, lastName, email, phone, photo }, token };
    if (showToken) {
      responceObject.token = token;
    }
    return responceObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
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
