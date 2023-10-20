import { Router } from 'express'
const router = Router()
import * as borrowerController from './borrower.controller.js'
import { asyncHandler } from '../../utils/errorhandling.js'
import { isAuth } from '../../middlewares/auth.js'
import { validationCoreFunction } from '../../middlewares/validation.js'
import * as validators from './borrower.validatorSchemas.js'

router.get('/', asyncHandler(borrowerController.getAllBorrowersController))

router.post('/:bookId', isAuth(), validationCoreFunction(validators.borrowBookSchema), asyncHandler(borrowerController.borrowBookController))

router.put('/', isAuth(), validationCoreFunction(validators.updateBorrowerSchema), asyncHandler(borrowerController.updateBorrowerController))

router.delete('/', isAuth(), asyncHandler(borrowerController.deleteBorrowerController))

router.put('/:bookId', validationCoreFunction(validators.returnBookSchema), asyncHandler(borrowerController.returnBookController))

router.get('/:id', validationCoreFunction(validators.getAllBooksForUserSchema) , asyncHandler(borrowerController.getAllBorrowedBooksForOneUserController))



export default router
