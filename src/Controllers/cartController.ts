import CartService from '../Services/cartService';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../security/auth';
import status from '../Errors/errorsStatus';

class CartController {
  private service: CartService;
  private req: Request;
  private res: Response;
  private next: NextFunction

  constructor(req: Request, res: Response, next: NextFunction) {
    this.service = new CartService();
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async createCart() {
    const { authorization } = this.req.headers;
    try {
      const idUser = verifyToken(authorization as string) as string;
      const data = await this.service.createCart(idUser);
      return this.res.status(status.CREATED).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async addProduct() {
    const { authorization } = this.req.headers;
    const { productId, quantity, price, total } = this.req.body;
    const subTotal = quantity * price;
    const products = { productId, quantity, price, subTotal };
    try {
      const idUser = verifyToken(authorization as string) as string;
      await this.service.addProduct(idUser, { products, total });
      return this.res.status(status.OK).json({ message: 'product successfully added!' });
    } catch (error) {
      this.next(error)
    }
  }

  async removeItem() {
    const { authorization } = this.req.headers;
    const { productId, price } = this.req.body;
    try {
      const idUser = verifyToken(authorization as string) as string;
      await this.service.removeItem(idUser, productId, price);
      return this.res.status(status.OK).json({ message: 'Item Removed!' });
    } catch (error) {
      this.next(error)
    }
  }
}

export default CartController;
