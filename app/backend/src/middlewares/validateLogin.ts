import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export default function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const { email, password } = req.body as UserCredentials;
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
  });
  const { error } = schema.validate(req.body);
  if (error) throw error;

  next();
}
