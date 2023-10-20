import Joi from "joi";



export const registerSchema = {
    body: Joi.object({
        name: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }),
        password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .messages({
                'string.pattern.base': 'your password must contain 1 Capital letter, any number of same letter and some numbers',
            })
            .required(),

    }).required().options({ presence: 'required' })
}

export const logInSchema = {
    body: Joi.object({
        email: Joi.string().email({ tlds: { allow: ['com'] } }),
        password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .messages({
                'string.pattern.base': 'your password must contain 1 Capital letter, any number of same letter and some numbers',
            })
            .required(),

    }).required().options({ presence: 'required' })
}