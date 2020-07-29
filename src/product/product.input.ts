import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ProductInput {

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
}