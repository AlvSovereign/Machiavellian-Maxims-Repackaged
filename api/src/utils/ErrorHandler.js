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
function ErrorHandler(err, message, status, additionalInfo, isOperational) {
  this.constructor.prototype.__proto__ = Error.prototype;
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.message = message;
  this.status = status;
  this.additionalInfo = additionalInfo;
  this.isOperational = isOperational;

  this.isTrustedError = error => {
    return error.isOperational;
  };
}

process.on('uncaughtException', error => {
  console.error('error: ', error);
  const handler = new ErrorHandler(error);
  if (!handler.isTrustedError(error)) process.exit(1);
});

const ErrorMiddleware = (err, req, res, next) => {
  console.error('err: ', err);
  const { additionalInfo, message, status } = err;

  res.status(status).send({
    message:
      message || 'Something went wrong with your request. Please try again',
    additionalInfo: additionalInfo || undefined
  });
};

export { ErrorHandler, ErrorMiddleware, ResponseStatus };
