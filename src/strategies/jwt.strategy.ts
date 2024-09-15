import { envs } from 'config'
import { PassportStatic } from 'passport'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

import { UserService } from '../services'

interface IJwtPayload {
  sub: string
  iat: number
}

export class JwtStrategy {
  constructor(passport: PassportStatic, userService: UserService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    }

    passport.use(
      new Strategy(options, async (payload: IJwtPayload, done) => {
        try {
          const user = await userService.findById(payload.sub)
          if (!user) return done(null, false)

          return done(null, user)
        } catch (error) {
          return done(error, false)
        }
      }),
    )
  }
}
