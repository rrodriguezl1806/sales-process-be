import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
// import { UsersController } from './user.controller';
import { User } from './user.entity';
import { UserResolvers } from './user.resolver';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/product.entity';
import { UserProduct } from '../user_product/user_product.entity';
import { ProductService } from '../product/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, UserProduct]),
    ProductModule
  ],
  providers: [
    UserService,
    UserResolvers,
    ProductService
  ],
  // controllers: [UsersController],
  exports: [
    UserService
  ]
})
export class UserModule {}