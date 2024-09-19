import { PassportStatic } from 'passport'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

import { envs } from '../config'
import { UserService } from '../services'
import { logger } from '../utils'

interface IJwtPayload {
  id: string
  email: string
  iat: number
  exp: number
}

export class JwtStrategy {
  constructor(passport: PassportStatic, _userService: UserService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    }

    passport.use(
      new Strategy(options, async (payload: IJwtPayload, done) => {
        try {
          const user = await _userService.findById(payload.id)
          if (!payload) return done(null, false)

          return done(null, user)
        } catch (error) {
          const err = error as Error
          logger.error({
            label: 'JWT',
            message: err.message,
            stack: err.stack,
          })
          return done(error, false)
        }
      }),
    )
  }
}
