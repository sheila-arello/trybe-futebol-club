import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: 'All fields must be filled' });
      break;
    case 'NotFoundError':
      res.status(401).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    case 'SequelizeConnectionRefusedError':
      res.status(503).end();
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};

export default errorMiddleware;
