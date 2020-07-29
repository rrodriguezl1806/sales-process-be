import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductType } from '../product/product.dto';
import { UserProductType } from '../user_product/user_product.dto';

@ObjectType()
export class UserType {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  userName: string;

  @Field()
  email: string;
}