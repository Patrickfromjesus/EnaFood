import { NextFunction, Request, Response } from 'express';
import OrderService from '../Services/orderService';

class OrderController {
  private service: OrderService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.service = new OrderService();
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async order() {

  }
}

export default OrderController;
