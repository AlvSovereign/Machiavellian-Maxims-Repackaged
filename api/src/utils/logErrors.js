const logErrors = (err, req, res, next) => {
  if (err.stack) {
    console.error(err.stack);
  }
  console.error(err.message);
  next(err);
};

export { logErrors };
