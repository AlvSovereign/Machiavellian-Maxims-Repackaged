const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

export { logErrors };
