import { model, Model, models, Schema } from 'mongoose';
import IOrders from '../Interfaces/IOrders';

class OrderModel {
  private schema: Schema;
  public model: Model<IOrders>;

  constructor() {
    const options = { 
      userId: { type: String, ref: 'User', required: true },
      date: { type: Date, default: Date.now },
      deliveryAddress: { type: String, required: true },
      paymentMethod: { type: String, required: true },
      status: { type: String, required: true },
      productsOrder: [{
        productId: { type: String, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
	      price: { type: Number, required: true },
      }],
      total: { type: Number, required: true },
     };
     this.schema = new Schema<IOrders>(options, { versionKey: false });
     this.model = models.Order || model('Order', this.schema);
  }
}

export default OrderModel;
