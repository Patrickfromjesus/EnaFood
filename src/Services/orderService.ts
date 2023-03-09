import { Model } from 'mongoose';
import Order from '../Domains/Order';
import IOrders from '../Interfaces/IOrders';
import OrderModel from '../Models/OrderModel';

class OrderService {
  private model: Model<IOrders>;

  constructor() {
    this.model = new OrderModel().model;
  }

  private createDomain(infos: IOrders) {
    return new Order(infos);
  }
}

export default OrderService;
