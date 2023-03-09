import CartService from '../Services/cartService';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../security/auth';

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
    const idUser = verifyToken(authorization as string) as string;
    try {
      const data = await this.service.createCart(idUser);
      return this.res.status(201).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async addProduct() {
    const { authorization } = this.req.headers;
    const { productId, quantity, price } = this.req.body;
    const subTotal = quantity * price;
    const idUser = verifyToken(authorization as string) as string;
    try {
      await this.service.addProduct(idUser, { productId, quantity, price, subTotal });
      return this.res.status(200).end();
    } catch (error) {
      this.next(error)
    }
  }

  async changeQuantity() {
    const { authorization } = this.req.headers;
    const { quantity } = this.req.body;
    const idUser = verifyToken(authorization as string) as string;
    try {
      await this.service.changeQuantity(idUser, quantity);
      return this.res.status(200).end();
    } catch (error) {
      this.next(error)
    }
  }

  async removeItem() {
    const { authorization } = this.req.headers;
    const idUser = verifyToken(authorization as string) as string;
    try {
      const data = await this.service.removeItem(idUser);
      return this.res.status(200).end();
    } catch (error) {
      this.next(error)
    }
  }
}

export default CartController;
