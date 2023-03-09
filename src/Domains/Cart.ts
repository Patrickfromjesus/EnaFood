import ICart, { productsCart } from '../Interfaces/ICart';

class Cart {
  public id: string;
  public userId: string;
  public products: productsCart[];
  public total: number;

  constructor(infos: ICart) {
    this.id = infos._id || '';
    this.userId = infos.userId;
    this.products = infos.products;
    this.total = infos.total;
  }

  public getTotal() {
    return this.products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  }
}

export default Cart;
