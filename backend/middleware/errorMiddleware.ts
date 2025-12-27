import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err?.name === 'ValidationError') statusCode = 400;
  if (err?.name === 'CastError') statusCode = 400;
  if (err?.name === 'JsonWebTokenError') statusCode = 401;
  if (err?.name === 'TokenExpiredError') statusCode = 401;
  if (err?.code === 11000) statusCode = 409;

  const code = (() => {
    if (statusCode === 400) return 'VALIDATION_ERROR';
    if (statusCode === 401) return 'UNAUTHORIZED';
    if (statusCode === 403) return 'FORBIDDEN';
    if (statusCode === 404) return 'NOT_FOUND';
    if (statusCode === 409) return 'CONFLICT';
    if (statusCode === 429) return 'RATE_LIMITED';
    return 'INTERNAL_SERVER_ERROR';
  })();

  const message =
    err?.message || (statusCode >= 500 ? 'Internal server error' : 'Request failed');

  res.status(statusCode);
  res.json({
    success: false,
    data: null,
    message,
    error: {
      code,
      message,
    },
    stack: process.env.NODE_ENV === 'production' ? null : err?.stack,
  });
};

export { notFound, errorHandler };
