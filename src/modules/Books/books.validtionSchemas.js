



import Joi from 'joi'

export const addBookSchema = {
    body: Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        quantity: Joi.number().integer().positive(),
        location: Joi.string()

    }).required().options({ presence: 'required' })
}

export const updateBookSchema = {
    body: Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        quantity: Joi.number().integer().positive(),
        location: Joi.string()

    }).required().options({ presence: 'optional' }),
    query: Joi.object({
        id: Joi.number().integer().positive().required()
    }).required()
}

export const deleteBookSchema = {
    query: Joi.object({
        id: Joi.number().integer().positive().required()
    }).required()
}