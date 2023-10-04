const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    switch (err.name) {
        case 'SequelizeValidationError':
            status = 400;
            message = err.errors.map(el => el.message)
            break;
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = err.errors[0].message
            break
        case 'InvalidLogin':
            status = 401
            message = 'Invalid email or password'
            break;
        case 'ErrorNotFound':
            status = 404
            message = 'Lodging not found'
            break;
        case 'Unauthenticated':
        case 'JsonWebTokenError':
            status = 401
            message = 'Invalid Token'
            break
        case 'Forbidden':
            status = 403
            message = `You aren't allow access this point`
            break
        case `Email can't be empty`:
            status = 400
            message = `Email can't be empty`
            break
        case `Password can't be empty`:
            status = 400
            message = `Password can't be empty`
            break
        case `ErrorBookmarkExist`:
            status = 403
            message = 'Bookmark Already Exist'
            break
        default:
            break
    }
    res.status(status).json({ message })
}

module.exports = errorHandler