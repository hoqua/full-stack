import { InputType, PickType } from '@nestjs/graphql'
import { UserCreateInput } from '@full-stack/api/generated/db-types'

@InputType()
export class LoginInput extends PickType(UserCreateInput, ['email', 'password']) {}
