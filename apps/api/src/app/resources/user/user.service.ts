import { Injectable } from '@nestjs/common'
import { DbService } from '@full-stack/api/data-access-db'
import {
  CreateOneUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs
} from '@full-stack/api/generated/db-types'

@Injectable()
export class UserService {
  constructor(private database: DbService) {}

  findOne(findUserArguments: FindUniqueUserArgs) {
    return this.database.user.findUnique(findUserArguments)
  }

  findAll() {
    return this.database.user.findMany()
  }

  create(userCreateArguments: CreateOneUserArgs) {
    return this.database.user.create(userCreateArguments)
  }

  update(userUpdateInput: UpdateOneUserArgs) {
    return this.database.user.update(userUpdateInput)
  }

  remove(removeUserArguments: FindUniqueUserArgs) {
    return this.database.user.delete(removeUserArguments)
  }
}
