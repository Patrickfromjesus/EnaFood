import { Model } from 'mongoose';
import User from '../Domains/User';
import errors from '../Errors/errors';
import IUser from '../Interfaces/IUser';
import UserModel from '../Models/UserModel';
import { generateToken } from '../security/auth';
import hashPass from '../security/hash';

type TLogin = { email: string, password: string };

class UserService {
  private model: Model<IUser>;

  constructor() {
    this.model = new UserModel().model;
  }

  private createDomain(infos: IUser) {
    const { id, name, email, paymentMethod, address } = new User(infos);
    return { id, name, email, paymentMethod, address };
  }

  private async getUserByEmail(email: string, password: string) {
    const user = await this.model.findOne({ email });
    if (user) throw errors.conflictError; 
  }

  private handleHash(pass: string) {
    const hashedPass = hashPass(pass);
    return hashedPass;
  }

  async createUser(infos: IUser) {
    await this.getUserByEmail(infos.email, infos.password);
    const hashedPass = this.handleHash(infos.password);
    const hashedInfos = { ...infos, password: hashedPass };
    const user = await this.model.create(hashedInfos);
    const token = generateToken({ id: user._id });
    return token;
  }

  async loginUser({ email, password }: TLogin) {
    const hashedPass = this.handleHash(password);
    const user = await this.model.findOne({ email });
    if (!user || user.password !== hashedPass) throw errors.invalidCredentialsError;
    const token = generateToken({ id: user._id });
    return token;
  }
}

export default UserService;
