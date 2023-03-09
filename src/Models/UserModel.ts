import { model, Model, models, Schema } from 'mongoose';
import IUser from '../Interfaces/IUser';

class UserModel {
  private schema: Schema;
  public model: Model<IUser>;

  constructor() {
    const options = {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      address: { type: String, required: true },
      paymentMethod: { type: String, required: true },
    };
    this.schema = new Schema<IUser>(options, { versionKey: false });
    this.model = models.User || model('User', this.schema);
  }
}

export default UserModel;
