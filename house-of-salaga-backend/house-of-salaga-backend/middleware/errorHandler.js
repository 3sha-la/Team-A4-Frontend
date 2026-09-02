export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  if (error?.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: Object.values(error.errors).map((item) => item.message),
    });
  }

  if (error?.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A record with that value already exists',
      field: Object.keys(error.keyPattern || {})[0],
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal server error',
  });
}
