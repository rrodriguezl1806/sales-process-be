import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './user.input';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async createUser(createUserDto: UserInput ): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      userName: createUserDto.userName,
      email: createUserDto.email,
      password: hashedPassword
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

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}