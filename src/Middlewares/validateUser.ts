import { NextFunction, Request, Response } from 'express';
import errors from '../Errors/errors';

const MIN_NAME_LENGTH = 10;
const MIN_PASS_LENGTH = 6;

const validateName = (name: string) => {
	if (name.length < MIN_NAME_LENGTH) throw errors.badRequestError;
}

const validatePass = (pass: string) => {
	if (pass.length < MIN_PASS_LENGTH) throw errors.badRequestError;
}

const validateEmail = (email: string) => {
	const emailRgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	if (!emailRgx.test(email)) throw errors.badRequestError;
}

export const validateUser = (req: Request, _res: Response, next: NextFunction) => {
	const fields = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	};
	try {
		validateName(fields.name);
		validateEmail(fields.email);
		validatePass(fields.password);
		return next();
	} catch (error) {
		next(error);
	}
}