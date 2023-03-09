import { Model } from 'mongoose';
import User from '../Domains/User';
import IUser from '../Interfaces/IUser';
import UserModel from '../Models/UserModel';
import hashPass from '../security/hash';

class UserService {
  private model: Model<IUser>;

  constructor() {
    this.model = new UserModel().model;
  }

  private createDomain(infos: IUser) {
    const { id, name, email, paymentMethod, address } = new User(infos);
    return { id, name, email, paymentMethod, address };
  }

  private handleHash(infos: IUser) {
    const hashedPass = hashPass(infos.password);
    return { ...infos, password: hashedPass };
  }

  async createUser(infos: IUser) {
    const hashedInfos = this.handleHash(infos);
    const user = await this.model.create(hashedInfos);
    return this.createDomain(user);
  }
}

export default UserService;
