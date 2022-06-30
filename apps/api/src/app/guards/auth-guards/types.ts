import { FastifyRequest, FastifyReply } from 'fastify'
import { User } from '@full-stack/api/generated/db-types'

export interface IUserContext {
  reply: FastifyReply
  request: FastifyRequest
  user: User
}

export type UserJwtPayload = false | { id: string }
