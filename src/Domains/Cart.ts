import ICart, { TproductsCart } from '../Interfaces/ICart';

class Cart {
  public id: string;
  public userId: string;
  public products: TproductsCart[];
  public total: number;

  constructor(infos: ICart) {
    this.id = infos._id || '';
    this.userId = infos.userId;
    this.products = infos.products;
    this.total = infos.total;
  }
}

export default Cart;
