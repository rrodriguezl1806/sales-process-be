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

  @Query(() => UserType)
  async getUserById(@Args('id') id: number) {
    return this.usersService.findOne(id)
  }

  @Mutation(() => UserType)
  async createUser(@Args('newUser') newUser: UserInput) {
    return this.usersService.createUser(newUser)
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('id') id: number,
    @Args('newData') newData: UserInput
  ) {
    return this.usersService.updateUser(id, newData)
  }
}