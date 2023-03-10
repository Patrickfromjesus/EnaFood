import { Model } from 'mongoose';
import Cart from '../Domains/Cart';
import ICart, { productsCart } from '../Interfaces/ICart';
import { validateQuantity } from '../Middlewares/validateCart';
import CartModel from '../Models/CartModel';

class CartService {
  private model: Model<ICart>;

  constructor() {
    this.model = new CartModel().model;
  }

  private createDomain(infos: ICart) {
    return new Cart(infos);
  }

  async createCart(userId: string) {
    const data = await this.model.create({ userId, products: [] });
    return this.createDomain(data);
  }

  async addProduct(userId: string, infos: productsCart) {
    const data = await this.model.findOne({ userId }, (err: Error, user: any) => {
      if (err) throw err;
      user.products.push(infos);
      user.save();
    });
  }

  async changeQuantity(userId: string, quantity: number) {
    validateQuantity(quantity);
    const data = this.model.findOne({ userId }, (err: Error, user: any) => {
      if (err) throw err;
      user.products.quantity = quantity;
      user.save();
    });
  }

  async removeItem(userId: string) {
    const data = this.model.deleteOne({ userId });
    return data;
  }
}

export default CartService;
