const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  console.error("ERROR:", err);

  res.status(statusCode).json({
    status: statusCode,
    message,
    data: null,
  });
};

export default errorMiddleware;