import IOrders, { TProductsOrder } from '../Interfaces/IOrders';

export default class Order {
	public id: string;
	public userId: string;
	public date: Date;
	public deliveryAddress: string;
	public paymentMethod: string;
  public status: string;
  public total: number;
	public productsOrder: TProductsOrder[];
  // productsOrder terá o id do produto e a qunatidade.

  constructor(order: IOrders) {
    this.id = order._id;
    this.userId = order.userId;
    this.date = order.date;
    this.deliveryAddress = order.deliveryAddress;
    this.paymentMethod = order.paymentMethod;
    this.status = order.status;
    this.total = order.total;
    this.productsOrder = order.productsOrder;
  }
}
