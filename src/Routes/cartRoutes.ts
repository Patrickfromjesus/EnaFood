import express, { NextFunction, Request, Response } from 'express';
import CartController from '../Controllers/cartController';
import { validateCart } from '../Middlewares/validateCart';

const cartRouter = express.Router();

cartRouter.post('/addProduct', validateCart, async (req: Request, res: Response, next: NextFunction) => (
  new CartController(req, res, next).addProduct()));

cartRouter.post('/', async (req: Request, res: Response, next: NextFunction) => (
  new CartController(req, res, next).createCart()));

cartRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => (
  new CartController(req, res, next).removeItem()));

export default cartRouter;
