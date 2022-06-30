import { Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { UserJwtPayload } from '../types'

// some jwt best practices https://www.rfc-editor.org/rfc/rfc8725.html

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jsonWebTokenOptions: { algorithms: ['HS256'] }
    })
  }

  async validate(payload: { sub?: string }): Promise<UserJwtPayload> {
    if (!payload.sub) return false

    return { id: payload.sub }
  }
}

const cookieExtractor = (request: FastifyRequest): string | null => {
  const isCookieTokenExist = !!request?.cookies?.token
  if (!isCookieTokenExist) {
    console.log('Cookie not passed') // TODO: log
    return null
  }

  const unsignedCookieToken = request.unsignCookie(request.cookies.token)
  return unsignedCookieToken?.value || null
}
