import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './user.input';
import * as bcrypt from 'bcrypt'
import { UserProduct } from '../user_product/user_product.entity';
import { Product } from '../product/product.entity';
import { ProductService } from '../product/product.service';
import { options } from 'tsconfig-paths/lib/options';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private productService: ProductService,

    @InjectRepository(UserProduct)
    private userProductRepository: Repository<UserProduct>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string | number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async createUser(newUser: UserInput ): Promise<User> {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const user = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      userName: newUser.userName,
      email: newUser.email,
      password: hashedPassword,
      products: []
    }

    // const createdUser = this.userRepository().save();
    return this.userRepository.save(user);
  }

  async incrementUserId() {
    const userList = await this.userRepository.find()
    if (userList.length == 0) {
      return 1
    } else {
      const lastUserId = userList[userList.length - 1]
      return lastUserId.id + 1
    }
  }

  async updateUser(id, newData: UserInput) {
    await this.userRepository.update(id, {
      firstName: newData.firstName,
      lastName: newData.lastName,
      userName: newData.userName,
      email: newData.email,
      password: newData.password
    })
    return await this.userRepository.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async userDoLike(userId, productId) {
    const relationShip = await this.userProductRepository.find({
      where: {
        userId,
        productId
      }
    })
    if (relationShip.length === 0) {
      this.doLike(userId, productId)
    } else {
      if (relationShip[0].like) {
        this.doUnlike(relationShip[0].id, userId, productId)
      }
    }
    return await this.userRepository.findOne(userId)
  }

  async doLike(userId, productId) {
    const userProduct = new UserProduct()
    userProduct.userId = userId
    userProduct.productId = productId
    userProduct.like = true
    await this.productService.updateProductLikeCount(productId)
    await this.userProductRepository.save(userProduct)
  }

  async doUnlike(id, userId, productId) {
    await this.productService.updateProductLikeCount(productId, false)
    await this.userProductRepository.update(id, {like: false})
  }

}