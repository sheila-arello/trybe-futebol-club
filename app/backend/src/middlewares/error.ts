import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: 'All fields must be filled' });
      break;
    case 'NotFoundError':
      res.status(401).json({ message }); // invalid token
      break;
    case 'invalid token':
      res.status(401).json({ message: 'Token must be a valid token' });
      break;
    case 'NotExists':
      res.status(404).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};

export default errorMiddleware;
