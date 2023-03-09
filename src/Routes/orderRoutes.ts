import express, { NextFunction, Request, Response } from 'express';

const orderRouter = express.Router();

orderRouter.get('/', async (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'OK!' }));

export default orderRouter;