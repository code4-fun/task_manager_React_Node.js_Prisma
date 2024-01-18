import ApiError from '../error/ApiError.js'
import errorhandler from 'errorhandler'

const errorHandler = (err, req, res, next) => {
  if(res.headersSent){
    return next(err)
  }

  if(process.env.NODE_ENV === 'development'){
    const errorHandler = errorhandler()
    errorHandler(err, req, res, next)
  } else {
    if (err instanceof ApiError) {
      return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: err.message || 'An error occurred'})
  }
}

export default errorHandler
