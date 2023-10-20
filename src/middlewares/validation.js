
const reqMethods = ['body', 'query', 'params', 'headers']

export const validationCoreFunction = (schema) => {
  return (req, res, next) => {
    const validationErrorArr = []
    for (const key of reqMethods) {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        })
        if (validationResult.error) {
          validationErrorArr.push(validationResult.error.details)
        }
      }
    }

    if (validationErrorArr.length) {
      req.validationErrorArr = validationErrorArr
      return next(new Error(' ', { cause: 400 }))
    }
    next()
  }
}
