import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

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

  @Column('text')
  phone: number;

  @Column('text')
  photo: string;


  @Column({
    type: 'enum',
    enum: ['freelancer', 'jobOwner'],
    nullable: true,
  })
  role: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponceObject(showToken = true) {
    const { firstName, lastName, email, token } = this;
    const responceObject = { user: { firstName, lastName, email }, token };
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
