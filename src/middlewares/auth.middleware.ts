import { Injectable, NestMiddleware } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    //Auth
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ message: 'Token is required' })
    }

    const parts = authHeader.split(' ')
    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: 'Token malformed' })
    }

    try {
      const decoded = await promisify(jwt.verify)(token, 'secret')
      req.body.userId = decoded.id
      return next()
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid' })
    }
  }
}