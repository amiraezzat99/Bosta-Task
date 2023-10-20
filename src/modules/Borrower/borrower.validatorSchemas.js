



import Joi from 'joi'

export const borrowBookSchema = {
    params: Joi.object({
        bookId: Joi.number().integer().positive().required()
    }).required()
}

export const updateBorrowerSchema = {
    body: Joi.object({
        name: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }),
        password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .messages({
                'string.pattern.base': 'your password must contain 1 Capital letter, any number of same letter and some numbers',
            })
            .required(),

    }).required().options({ presence: 'optional' })
}

export const returnBookSchema = {
    params: Joi.object({
        bookId: Joi.number().integer().positive().required()
    }).required()
}

export const getAllBooksForUserSchema = {
    params: Joi.object({
        bookId: Joi.number().integer().positive().required()
    }).required()
}