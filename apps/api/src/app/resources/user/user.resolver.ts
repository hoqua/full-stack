import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import {
  CreateOneUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs,
  User
} from '@full-stack/api/generated/db-types'
import { UseGuards } from '@nestjs/common'
import { CheckAuthGuard } from '../../guards/auth-guards/check-auth.guard'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(CheckAuthGuard)
  @Query(() => User)
  user(@Args() findUserArguments: FindUniqueUserArgs) {
    return this.userService.findOne(findUserArguments)
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => [User])
  users() {
    return this.userService.findAll()
  }

  @UseGuards(CheckAuthGuard)
  @Mutation(() => User)
  createUser(@Args() userCreateArguments: CreateOneUserArgs) {
    return this.userService.create(userCreateArguments)
  }

  @UseGuards(CheckAuthGuard)
  @Mutation(() => User)
  updateUser(@Args() userUpdateInput: UpdateOneUserArgs) {
    return this.userService.update(userUpdateInput)
  }

  @UseGuards(CheckAuthGuard)
  @Mutation(() => User)
  removeUser(@Args() removeUserArguments: FindUniqueUserArgs) {
    return this.userService.remove(removeUserArguments)
  }
}
