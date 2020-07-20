import { UserType } from './user.dto';
import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { UserInput } from './user.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolvers {
  constructor(
    private usersService: UserService,
  ) {}

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAll()
  }

  // @Query(() => UserType)
  // async getUserById(@Args('userId') userId: number) {
  //   return this.usersService.findUserByUserId(userId)
  // }
  //
  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput) {
    return this.usersService.createUser(input)
  }
}