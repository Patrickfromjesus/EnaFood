export type TProductsOrder = {
  productId: string;
  quantity: number;
}

export default interface IOrders {
  _id: string;
  id?: string;
	userId: string;
	date: string;
	deliveryAddress: string;
	paymentMethod: string;
	productsOrder: TProductsOrder[];
}
