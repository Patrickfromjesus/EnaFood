import { model, Model, models, Schema } from 'mongoose';
import ICart from '../Interfaces/ICart';

class CartModel {
  private schema: Schema;
  public model: Model<ICart>;

  constructor() {
    const options = {
      userId: { type: String, ref: 'User', required: true },
      products: [{
        productId: { type: String, ref: 'Product' },
        price: Number,
        quantity: Number,
        subTotal: Number,
      }],
      total: { type: Number, required: true },
    };
    this.schema = new Schema<ICart>(options, { versionKey: false });
    this.model = models.Cart || model('Cart', this.schema);
  }
}

export default CartModel;
