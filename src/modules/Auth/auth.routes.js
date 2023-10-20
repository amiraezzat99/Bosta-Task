import { Router } from 'express'
const router = Router()
import * as authController from './auth.controller.js'
import { asyncHandler } from '../../utils/errorhandling.js'
import { validationCoreFunction } from '../../middlewares/validation.js'
import * as validators from './auth.validatorSchema.js'

router.post('/', validationCoreFunction(validators.registerSchema), asyncHandler(authController.registerController))

router.post('/login', validationCoreFunction(validators.logInSchema), asyncHandler(authController.loginController))

export default router
