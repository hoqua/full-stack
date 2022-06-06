import { Injectable } from "@nestjs/common";
import { DbService } from "@full-stack/api/data-access-db";
import {CreateOneUserArgs, FindUniqueUserArgs, UpdateOneUserArgs} from "@full-stack/api/generated/db-types";

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  findOne(findUserArgs: FindUniqueUserArgs) {
    return this.db.user.findUnique(findUserArgs)
  }

  findAll() {
    return this.db.user.findMany()
  }

  create(userCreateArgs: CreateOneUserArgs) {
    return this.db.user.create(userCreateArgs)
  }

  update(userUpdateInput: UpdateOneUserArgs) {
    return this.db.user.update(userUpdateInput)
  }

  remove(removeUserArgs: FindUniqueUserArgs) {
    return this.db.user.delete(removeUserArgs)
  }
}
