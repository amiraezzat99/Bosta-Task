import { borrowerModel } from '../../DB/Models/borrower.model.js'
import { generateToken, verifyToken } from '../utils/tokenFunctions.js'

export const isAuth = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers
      if (!authorization) {
        return next(new Error('Please login first', { cause: 400 }))
      }
      console.log(authorization)
      if (!authorization.startsWith('bosta__')) {
        return next(new Error('invalid token prefix', { cause: 400 }))
      }

      const splitedToken = authorization.split('__')[1]

      try {
        const decodedData = verifyToken({
          token: splitedToken,
          signature: process.env.DEFAULT_SIGNATURE,
        })
        const findUser = await borrowerModel.findByPk(decodedData.id)
        if (!findUser) {
          return next(new Error('Please SignUp', { cause: 400 }))
        }
        req.authUser = findUser
        next()
      } catch (error) {
        return next(new Error('invalid token', { cause: 500 }))
      }
    } catch (error) {
      next(new Error('catch error in auth', { cause: 500 }))
    }
  }
}
