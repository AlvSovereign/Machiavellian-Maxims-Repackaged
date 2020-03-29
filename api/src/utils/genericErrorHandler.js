const genericErrorHandler = (err, req, res) => {
  console.log('err: ', err);
  res.status(err.status || 500).send({ ...err });
};

export { genericErrorHandler };
