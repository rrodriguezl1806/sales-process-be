import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductType } from './product.dto';
import { ProductService } from './product.service';
import { ProductInput } from './product.input';

@Resolver('Product')
export class ProductResolver {

  constructor(
    private productService: ProductService
  ) {}

  @Query(() => [ProductType])
  async products() {
    return this.productService.findAll()
  }

  @Query(() => ProductType)
  async findProduct(@Args('id') id: number) {
    return await this.productService.findProduct(id)
  }

  @Query(() => ProductType)
  async findProductByCode(@Args('code') code: string) {
    return await this.productService.findProductByCode(code)
  }

  @Query(() => [ProductType])
  async findProductByCategory(@Args('category') category: string) {
    return await this.productService.findProductByCategory(category)
  }

  @Mutation(() => ProductType)
  async createProduct(@Args('newProduct') newProduct: ProductInput) {
    return await this.productService.createProduct({...newProduct})
  }
}
