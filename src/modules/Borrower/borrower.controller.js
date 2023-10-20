
import { Op } from "sequelize"
import { bookModel } from "../../../DB/Models/book.model.js"
import { borrowerModel } from "../../../DB/Models/borrower.model.js"
import bcrypt from 'bcrypt'
import { generateCsvFile } from "../../utils/generateCsv.js"

//============================= get all borrowers API =============================
/**
 * get all borrowers
 * return all borrowers
 */
export const getAllBorrowersController = async (req, res, next) => {
    const borrowers = await borrowerModel.findAll()
    if (!borrowers) {
        return next(new Error('no borrowers found', { cause: 404 }))
    }
    res.status(200).json({ message: 'all borrowers', borrowers })
}

//================================ update borrower account  ===================================
/**
 * get data from user (name , email , password)
 * update borrower account
 * return success message
 */
export const updateBorrowerController = async (req, res, next) => {

    const { name, email, password } = req.body
    let hashedPassword
    if (password) {
        hashedPassword = bcrypt.hashSync(password, 8)
    }
    const updatedBorrower = await borrowerModel.update(
        { name, email, password: hashedPassword },
        {
            where: {
                id: req.authUser.id
            }
        })
    if (!updatedBorrower[0]) {
        return next(new Error('updated Borrower is faild', { cause: 400 }))
    }
    res.status(200).json({ message: 'updated Borrower is done' })
}


//================================ delete Book ===================================
/*
 * delete borrower
 * return success message
 */
export const deleteBorrowerController = async (req, res, next) => {
    const deletedBook = await borrowerModel.destroy({
        where: {
            id: req.authUser.id
        }
    })
    if (!deletedBook) {
        return next(new Error('delete borrower is faild', { cause: 400 }))
    }
    res.status(200).json({ message: 'delete borrower is done' })
}


//============================= Borrow a book API =============================
/**
 * get bookId from params
 * get borrowerId from token
 * check if book available  or not
 * update book status to borrowed
 * return success message
 */
export const borrowBookController = async (req, res, next) => {
    const borrowerId = req.authUser.id
    const { bookId } = req.params
    // asume that the due_Date will be after 2 weeks for all borrowers
    const borrowedBook = await bookModel.update(
        { borrowedBy: borrowerId, due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), book_status: 'borrowed', borrowed_at: new Date(Date.now()) },
        {
            where: {
                [Op.and]: [
                    { id: bookId },
                    { book_status: 'available' }
                ]
            }
        }
    )
    if (!borrowedBook[0]) {
        return next(new Error('borrow book is faild please make sure from your book is available', { cause: 400 }))
    }
    res.status(200).json({ message: 'borrow book is done' })
}


//============================= return book API =============================
/**
 * get bookId from params
 * check if book borrowed  or not
 * update book status to available
 * return success message
 */

export const returnBookController = async (req, res, next) => {
    const { bookId } = req.params
    const returnedBook = await bookModel.update(
        { borrowedBy: null, due_date: null, book_status: 'available', returned_at: new Date(Date.now()) },
        {
            where: {
                [Op.and]: [
                    { id: bookId },
                    { book_status: 'borrowed' }
                ]
            }
        }
    )
    if (!returnedBook[0]) {
        return next(new Error('return book is faild please make sure from your book is borrowed', { cause: 400 }))
    }
    res.status(200).json({ message: 'return book is done' })
}


//============================= get all borrowed books for user API ============================= 
/**
 * get userId from params
 * get all borrowed books for this user
 * return all borrowed books for this user
 */
export const getAllBorrowedBooksForOneUserController = async (req, res, next) => {
    const { id } = req.params
    const borrowedBooks = await bookModel.findAll({
        where: {
            [Op.and]: [
                { borrowedBy: id },
                { book_status: 'borrowed' }
            ]
        }
    })
    if (!borrowedBooks.length) {
        return next(new Error('no borrowed books found for this user', { cause: 404 }))
    }
    res.status(200).json({ message: 'all borrowed books for this user', borrowedBooks })
}

