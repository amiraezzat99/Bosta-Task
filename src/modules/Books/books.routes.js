import { Router } from 'express'
import { asyncHandler } from '../../utils/errorhandling.js'
import * as bookController from './books.controller.js'
import { validationCoreFunction } from '../../middlewares/validation.js'
import * as validators from './books.validtionSchemas.js'
const router = Router()


router.post('/', validationCoreFunction(validators.addBookSchema), asyncHandler(bookController.addBook))

router.get('/', asyncHandler(bookController.getAllBooks))

router.put('/', validationCoreFunction(validators.updateBookSchema), asyncHandler(bookController.updateBook))

router.delete('/', validationCoreFunction(validators.deleteBookSchema), asyncHandler(bookController.deleteBook))

router.get('/search', asyncHandler(bookController.searchBooks))

router.get('/BorrowedBooks', asyncHandler(bookController.borrowerProcessSheet))

router.get('/BorrowedBooksLastMonth', asyncHandler(bookController.exportBorrowedBooksLastMonth))

export default router
