import { Model } from 'mongoose';
import Product from '../Domains/Product';
import IProducts from '../Interfaces/IProducts';
import ProductModel from '../Models/ProductModel';

class ProductService {
  private model: Model<IProducts>;

  constructor() {
    this.model = new ProductModel().model;
  }

  private createDomain(infos: IProducts) {
    return new Product(infos);
  }

  async getAllProducts(page: number) {
    const LIMIT = 10;
    const products = await this.model.find().skip(page * LIMIT).limit(LIMIT);
    return products.map((product) => this.createDomain(product));
  }
}

export default ProductService;
