
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); 
  }


static badRequest(message = 'Bad Request') {
  return new ApiError(400, message);
}

  static notFound(message = "Not Found") {
        return new ApiError(404, message);
    }

     static conflict(message = "User already exists") {
        return new ApiError(409 , message);
    }

    static unauthorized(message = "Invalid email or password" ){
      return new ApiError(401, message)
    }

     static forbidden(message = "You are not authorized to access this resource." ){
      return new ApiError(403, message)
    }

}

export default ApiError;