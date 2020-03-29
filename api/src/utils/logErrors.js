const logErrors = (err, req, res, next) => {
  console.error(err.err || err.message);
  next(err);
};

export { logErrors };
