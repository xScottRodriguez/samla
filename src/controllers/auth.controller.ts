import { Request, Response } from 'express'

class AuthController {
  login(req: Request, res: Response) {
    return res.send('Login route')
  }
  register(req: Request, res: Response) {
    return res.send('Register route')
  }
}

export default new AuthController()
