import IUser from '../Interfaces/IUser';

export default class User {
	public id: string;
	public name: string;
	public email: string;
	private password: string;
	private address: string;
	public paymentMethod: string;

  constructor(user: IUser) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.address = user.address;
    this.paymentMethod = user.paymentMethod;
  }
}
