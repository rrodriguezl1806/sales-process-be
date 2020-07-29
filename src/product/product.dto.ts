import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
  @Field()
  id: number;

  @Field()
  code: string

  @Field()
  category: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: string;

  @Field()
  count: number;

  @Field()
  image: string

  @Field()
  isActive: boolean

  @Field()
  likes: number

}