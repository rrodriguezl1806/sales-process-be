import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class UserProduct extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_date: Date;

  @Column({default: false})
  like: boolean;

  @Column({default: false})
  bought: boolean

  @ManyToOne(type => Product, product => product.id)
  productId: number

  @ManyToOne(type => User, user => user.id)
  userId: number
}