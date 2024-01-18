class ApiError extends Error {
  constructor(status, message) {
    super()
    this.status = status
    this.message = message
  }

  static badRequest(message) {
    return new ApiError(400, message || 'Request cannot be processed')
  }

  static forbidden(message) {
    return new ApiError(403, message || 'Unauthorized')
  }

  static internalServerError(message) {
    return new ApiError(500, message || 'Internal server error')
  }
}

export default ApiError
