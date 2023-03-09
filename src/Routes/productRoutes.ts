import express, { NextFunction, Request, Response } from 'express';

const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'OK!' }));

export default productRouter;