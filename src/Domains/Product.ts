import IProducts from '../Interfaces/IProducts';

export default class Product {
	public id: string;
	public name: string;
	public description: string;
	public price: number;
  public imgUrl: string;

  constructor(product: IProducts) {
    this.id = product._id || '';
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.imgUrl = product.imgUrl;
  }
}
