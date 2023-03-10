import express, { NextFunction, Request, Response } from 'express';
import CartController from '../Controllers/cartController';
import { validateCart } from '../Middlewares/validateCart';

const cartRouter = express.Router();

cartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'OK!' }));

cartRouter.post('/addProduct', validateCart, async (req: Request, res: Response, next: NextFunction) => (
  new CartController(req, res, next).addProduct()));

cartRouter.post('/changeQuantity', async (req: Request, res: Response, next: NextFunction) => (
  new CartController(req, res, next).changeQuantity()));

cartRouter.post('/', async (req: Request, res: Response, next: NextFunction) => (
  new CartController(req, res, next).createCart()));

cartRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => (
  new CartController(req, res, next).removeItem()));

export default cartRouter;
