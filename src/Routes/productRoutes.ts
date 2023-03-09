import express, { NextFunction, Request, Response } from 'express';
import ProductController from '../Controllers/productController';

const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => (
  new ProductController(req, res, next).getAllProducts()));

export default productRouter;