import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { UserProduct } from '../user_product/user_product.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  category: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  count: number;

  @Column()
  image: string

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  likes: number;

  @OneToMany(type => UserProduct, userProduct => userProduct.id)
  userProduct: UserProduct[]
}