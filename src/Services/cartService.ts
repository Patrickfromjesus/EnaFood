import { Model } from 'mongoose';
import Cart from '../Domains/Cart';
import errors from '../Errors/errors';
import ICart, { TproductsCart } from '../Interfaces/ICart';
import CartModel from '../Models/CartModel';

type TAddProduct = { products: TproductsCart, total: number };

class CartService {
  private model: Model<ICart>;

  constructor() {
    this.model = new CartModel().model;
  }

  private createDomain(infos: ICart) {
    return new Cart(infos);
  }

  async createCart(userId: string) {
    // Retorna o carrinho, se já existente.
    const response = await this.model.findOne({ userId });
    if (response) return this.createDomain(response);
    // Cria um carrinho vazio para a pessoa usuária, se não houver.
    const data = await this.model.create({ userId, products: [], total: 0.00 });
    return this.createDomain(data);
  }

  async getProductCart(userId: string, productId: string) {
    const data = await this.model.findOne({ userId, "products.productId": productId });
    return data;
  }

  private async changeValuesCart(userId: string, total: number, products: TproductsCart) {
    return await this.model.updateOne(
      { userId, "products.productId": products.productId },
      {
        total, $set: { "products.$.quantity": products.quantity, "products.$.subTotal": products.subTotal },
      });
  }

  async removeItem(userId: string, productId: string, price: number) {
    // Remove um produto do carrinho.
    const data = await this.model.findOneAndUpdate(
      { userId, "products.productId": productId },
      { $pull: { products: { productId } } },
    );
    // Altera o total do carrinho.
    if (!data) throw errors.invalidProductError;
    await this.model.updateOne({ userId }, { $inc: { total: -price } });
  }

  async addProduct(userId: string, { products, total }: TAddProduct) {
    // Se quantity for 0, retirar item do carrinho.
    if (products.quantity === 0) {
      return await this.removeItem(userId, products.productId, products.price);
    }
    // Se já existir um produto igual no carrinho, alterar somente a quantidade, o subtotal e o total.
    const data = await this.getProductCart(userId, products.productId);
    if (data) {
      const newSub = data.products[0].subTotal + products.subTotal;
      const newQnt = data.products[0].quantity + products.quantity;
      const allProducts = { ...products, quantity: newQnt, subTotal: newSub };
      const newTotal = data.total + products.subTotal;
      return await this.changeValuesCart(userId, newTotal, allProducts);
    }
    // Se não existir esse produto, criar um novo objeto no carrinho.
    const totalData = await this.model.findOneAndUpdate({ userId }, { $push: { products }, $inc: { total: products.subTotal } });
    // Atualiza o total a se pagar.
    /* await this.model.updateOne({ userId }, { total: total + totalData?.total }); */
  }

  async removeProduct(userId: string, { products, total }: TAddProduct) {
    if (products.quantity === 0) {
      return await this.removeItem(userId, products.productId, products.price);
    }
    const data = await this.getProductCart(userId, products.productId);
    if (!data) {
      throw errors.invalidProductError;
    }
    const newSub = data.products[0].subTotal - products.subTotal;
    const newQnt = data.products[0].quantity - products.quantity;
    const allProducts = { ...products, quantity: newQnt, subTotal: newSub };
    const newTotal = data.total - products.subTotal;
    return await this.changeValuesCart(userId, newTotal, allProducts);
  }
}

export default CartService;
