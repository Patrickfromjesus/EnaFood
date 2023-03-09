import IOrders, { TProductsOrder } from '../Interfaces/IOrders';

export default class Order {
	public id: string;
	public userId: string;
	public date: string;
	public deliveryAddress: string;
	public paymentMethod: string;
	public productsOrder: TProductsOrder[];
  // productsOrder terá o id do produto e a qunatidade.

  constructor(order: IOrders) {
    this.id = order._id;
    this.userId = order.userId;
    this.date = order.date;
    this.deliveryAddress = order.deliveryAddress;
    this.paymentMethod = order.paymentMethod;
    this.productsOrder = order.productsOrder;
  }
}
