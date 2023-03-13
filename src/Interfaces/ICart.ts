export type TproductsCart = {
  productId: string;
  price: number;
  quantity: number;
  subTotal: number;
};

export default interface ICart {
  _id?: string;
  id?: string;
  userId: string;
  products: TproductsCart[];
  total: number;
}
