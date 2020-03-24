const genericErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.err, message: err.message });
};

export { genericErrorHandler };
