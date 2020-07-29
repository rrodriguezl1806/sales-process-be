import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductInput } from './product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findProduct(id): Promise<Product> {
    return this.productRepository.findOne(id)
  }

  async findProductByCode(code: string): Promise<Product> {
    return await this.productRepository.findOne({code});
  }

  async findProductByCategory(category: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { category }
    });
  }

  createProduct(newProduct: ProductInput): Promise<Product> {
    return this.productRepository.save(newProduct)
  }

  async updateProductLikeCount(productId, plus = true) {
    const product = await this.productRepository.findOne(productId)
    if (plus) {
      product.likes ++
    } else {
      product.likes --
    }
    await this.productRepository.update(productId, {likes: product.likes})
  }
}
