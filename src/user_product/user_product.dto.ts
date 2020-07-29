import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductType } from '../product/product.dto';
import { UserType } from '../user/user.dto';

@ObjectType()
export class UserProductType {
  @Field()
  id: number;

  @Field()
  create_date: Date;

  @Field()
  like: number;

  @Field()
  bought: string;

  @Field(() => [ProductType])
  products: ProductType[]

  @Field(() => [UserType])
  users: UserType[]

}