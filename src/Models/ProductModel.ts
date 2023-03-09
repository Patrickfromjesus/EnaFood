import { model, Model, models, Schema } from 'mongoose';
import IProducts from '../Interfaces/IProducts';

class ProductModel {
  private schema: Schema;
  public model: Model<IProducts>;

  constructor() {
    const options = {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      imgUrl: { type: String, required: true },
    };
    this.schema = new Schema<IProducts>(options, { versionKey: false });
    this.model = models.Product || model('Product', this.schema);
  }
}

export default ProductModel;
