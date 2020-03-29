const genericErrorHandler = (err, req, res) => {
  res.status(err.status || 500).send({ ...err });
};

export { genericErrorHandler };
