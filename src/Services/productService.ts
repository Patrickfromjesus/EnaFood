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
}

export default ProductService;
