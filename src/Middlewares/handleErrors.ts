import { NextFunction, Request, Response } from 'express';
import IError from '../Interfaces/IError';
import error from '../Errors/errorsStatus';

const handleErrors = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(error.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

export default handleErrors;
