export function errorHandler(err, _req, res, _next) {
  console.error("❌ Error:", err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "fail",
    message: err.message || "Internal server error",
  });
}
