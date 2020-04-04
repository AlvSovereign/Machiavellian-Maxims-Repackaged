const ResponseStatus = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
});

// centralized error object that derives from Node’s Error
function ErrorHandler(message, status, additionalInfo, isOperational) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.message = message;
  this.status = status;
  this.additionalInfo = additionalInfo;
  this.isOperational = isOperational;

  this.isTrustedError = error => {
    return error.isOperational;
  };
}

ErrorHandler.prototype = Object.create(Error.prototype);
ErrorHandler.prototype.constructor = ErrorHandler;

process.on('uncaughtException', error => {
  AppError(error);
  if (!AppError.isTrustedError(error)) process.exit(1);
});

const ErrorMiddleware = (err, req, res, next) => {
  const { additionalInfo, message, status } = err;

  res.status(status).send({
    message:
      message || 'Something went wrong with your request. Please try again',
    additionalInfo
  });
};

export { ErrorHandler, ErrorMiddleware, ResponseStatus };
