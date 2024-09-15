// src/config/passport.config.ts
import passport from 'passport'

import { UserService } from '../services'
import { JwtStrategy } from '../strategies'

export const configurePassport = () => {
  const userService = new UserService()
  new JwtStrategy(passport, userService)
}
