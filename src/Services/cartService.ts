import { Model } from 'mongoose';
import Cart from '../Domains/Cart';
import errors from '../Errors/errors';
import ICart, { TproductsCart } from '../Interfaces/ICart';
import CartModel from '../Models/CartModel';

type TAddProduct = { products: TproductsCart };
type TChangeValues = { productId: string, quantity: number, price: number };

class CartService {
  private model: Model<ICart>;

  constructor() {
    this.model = new CartModel().model;
  }

  private parseTwoDecimalsPlace(value: number) {
    return Number.parseFloat(value.toFixed(2));
  }

  private createDomain(infos: ICart) {
    return new Cart(infos);
  }

  async createCart(userId: string) {
    const response = await this.model.findOne({ userId });
    if (response) return this.createDomain(response);
    const data = await this.model.create({ userId, products: [], total: 0.00 });
    return this.createDomain(data);
  }

  async getProductCart(userId: string, productId: string) {
    const data = await this.model.findOne({ userId, "products.productId": productId });
    return data;
  }

  private async changeValuesCart(userId: string, total: number, products: TproductsCart) {
    return await this.model.findOneAndUpdate(
      { userId, "products.productId": products.productId },
      {
        total, $set: { "products.$.quantity": products.quantity, "products.$.subTotal": products.subTotal },
      });
  }

  async removeItem(userId: string, productId: string) {
    const data = await this.model.findOneAndUpdate(
      { userId, "products.productId": productId },
      { $pull: { products: { productId } } },
    );
    if (!data) throw errors.invalidProductError;
    const price = data.products[0].subTotal;
    await this.model.updateOne({ userId }, { $inc: { total: -price } });
  }

  async addProduct(userId: string, { products }: TAddProduct) {
    if (products.quantity === 0) {
      return await this.removeItem(userId, products.productId);
    }
    const data = await this.getProductCart(userId, products.productId);
    if (data) {
      const newSub = data.products[0].subTotal + products.subTotal;
      const newQnt = data.products[0].quantity + products.quantity;
      const allProducts = { ...products, quantity: newQnt, subTotal: this.parseTwoDecimalsPlace(newSub) };
      const newTotal = this.parseTwoDecimalsPlace(data.total + products.subTotal);
      return await this.changeValuesCart(userId, newTotal, allProducts);
    }
    await this.model.findOneAndUpdate({ userId }, { $push: { products }, $inc: { total: products.subTotal } });
  }

  async removeProduct(userId: string, { products }: TAddProduct) {
    const data = await this.getProductCart(userId, products.productId);
    if (!data) {
      throw errors.invalidProductError;
    }
    if (products.quantity === 0 || data.products[0].quantity === 1) {
      return await this.removeItem(userId, products.productId);
    }
    const newSub = data.products[0].subTotal - products.subTotal;
    const newQnt = data.products[0].quantity - products.quantity;
    const allProducts = { ...products, quantity: newQnt, subTotal: this.parseTwoDecimalsPlace(newSub) };
    const newTotal = this.parseTwoDecimalsPlace(data.total - products.subTotal);
    await this.changeValuesCart(userId, newTotal, allProducts);
  }

  async changeQuantity(userId: string, { productId, quantity, price }: TChangeValues) {
    if (quantity === 0) {
      return await this.removeItem(userId, productId);
    }
    const data = await this.getProductCart(userId, productId);
    if (!data) {
      throw errors.invalidProductError;
    }
    const subTotal = quantity * price;
    const newSubTotalToReduce = subTotal - data.products[0].subTotal;
    const newTotal = this.parseTwoDecimalsPlace(data.total + newSubTotalToReduce);
    const product = { productId, quantity, price, subTotal };
    await this.changeValuesCart(userId, newTotal, product);
  }
}

export default CartService;
