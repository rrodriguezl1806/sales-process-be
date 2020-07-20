import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
// import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserResolvers } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UserService,
    UserResolvers
  ],
  // controllers: [UsersController],
  exports: [
    UserService
  ]
})
export class UserModule {}