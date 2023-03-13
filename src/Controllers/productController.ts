import { NextFunction, Request, Response } from 'express';
import ProductService from '../Services/productService';

class ProductController {
  private service: ProductService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.service = new ProductService();
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async getAllProducts() {
    try {
      const { page } = this.req.query;
      const data = await this.service.getAllProducts(Number(page) || 0);
      return this.res.status(200).json(data);
    } catch (error) {
      this.next(error);
    }
  }
}

export default ProductController;
