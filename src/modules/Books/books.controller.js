import { bookModel } from "../../../DB/Models/book.model.js"
import { customAlphabet } from "nanoid"
import { Op } from "sequelize"
import { generateCsvFile } from "../../utils/generateCsv.js"

//================================ Add Book ===================================
/**
 * get data from user (title , author , quantity , location)
 * create new book
 * return success message
 */
function generateISBN() {
    const GS1_prefix = customAlphabet(`1234567890`, 3)
    const Manufacturer_code = customAlphabet(`1234567890`, 4)
    const Product_code = customAlphabet(`1234567890`, 5)
    const check_digit = customAlphabet('01', 1)
    return `${GS1_prefix()}-${Manufacturer_code()}-${Product_code()}-${check_digit()}`
}
export const addBook = async (req, res, next) => {
    const { title, author, quantity, location } = req.body
    const ISBN = generateISBN()
    const bookAdded = await bookModel.create({
        title,
        author,
        available_quantity: quantity,
        shelf_location: location,
        ISBN
    })
    if (!bookAdded) {
        return next(new Error('add book is faild', { cause: 400 }))
    }
    res.status(201).json({ message: 'add book is done', bookAdded })
}


//================================ Get All Books ===================================
/**
 * get all books
 * return all books
 */
export const getAllBooks = async (req, res, next) => {
    const books = await bookModel.findAll()
    if (!books) {
        return next(new Error('get books is faild', { cause: 400 }))
    }
    res.status(200).json({ message: 'get books is done', books })
}



//================================ update Book ===================================
/**
 * get data from user (title , author , quantity , location)
 * update book
 * return success message
 */
export const updateBook = async (req, res, next) => {
    const { title, author, quantity, location } = req.body
    const updatedBook = await bookModel.update(
        { title, author, available_quantity: quantity, shelf_location: location },
        {
            where: {
                id: req.query.id
            }
        })
    if (!updatedBook[0]) {
        return next(new Error('update book is faild', { cause: 400 }))
    }
    res.status(200).json({ message: 'update book is done' })
}


//================================ delete Book ===================================
/**
 * get book id from user
 * delete book
 * return success message
 */
export const deleteBook = async (req, res, next) => {
    const deletedBook = await bookModel.destroy({
        where: {
            id: req.query.id
        }
    })
    if (!deletedBook) {
        return next(new Error('delete book is faild', { cause: 400 }))
    }
    res.status(200).json({ message: 'delete book is done' })
}



//================================ search book by title, auther , ISBN ===================================
/**
 * get data from user (title , author , ISBN)
 * search for book  by title, auther , ISBN
 * return all books that match the search
 * if there is no match return error message
 * if there is match return success message and books
 */
export const searchBooks = async (req, res, next) => {
    const {
        title,
        author,
        ISBN
    } = req.query
    const books = await bookModel.findAndCountAll({
        where: {
            [Op.or]:
                [
                    { title: { [Op.like]: `%${title}%` } },
                    { author: { [Op.like]: `%${author}%` } },
                    { ISBN: { [Op.like]: `%${ISBN}%` } }
                ]
        }
    })
    if (!books) {
        return next(new Error('get books is faild', { cause: 400 }))
    }
    res.status(200).json({ message: 'get books is done', books })
}


//============================= Export borrowed process data API ============================= 
/**
  * export all borrowed books with some data about borrowing process
 */

export const borrowerProcessSheet = async (req, res, next) => {
    const data = await bookModel.findAll({
        where: {
            book_status: "borrowed"
        }
    }, { attributes: ['id', 'title', 'borrowed_at', 'returned_at', 'due_date', 'borrowedBy', 'book_status'] })

    await generateCsvFile({
        file_name: `sheet_${Date.now()}`,
        data: data.map(ele => {
            return ele.dataValues
        })
    })
    res.status(200).json({ message: 'Borrowed Books returned successfully', data })
}

//============================= Export borrowed bookes last month API ============================= 
/**
  * export  borrowed books with some data about borrowing process within last month
 */


export const exportBorrowedBooksLastMonth = async (req, res, next) => {

    const data = await bookModel.findAll({
        where: {
            [Op.and]:
                [
                    { borrowed_at: { [Op.lte]: new Date() } },
                    { borrowed_at: { [Op.gte]: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)) } },
                    { book_status: "borrowed" }
                ]

        }
    }, { attributes: ['id', 'title', 'borrowed_at', 'returned_at', 'due_date', 'borrowedBy', 'book_status'] })

    await generateCsvFile({
        file_name: `sheet_${Date.now()}`,
        data: data.map(ele => {
            return ele.dataValues
        })
    })
    res.status(200).json({ message: 'Borrowed Books Last Month returned successfully', data })
}