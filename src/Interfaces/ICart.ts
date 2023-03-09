export type productsCart = {
  productId: string;
  price: number;
  quantity: number;
  subTotal: number;
};

export default interface ICart {
  _id?: string;
  id?: string;
  userId: string;
  products: productsCart[];
  total: number;
}
