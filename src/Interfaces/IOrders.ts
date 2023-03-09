export type TProductsOrder = {
  productId: string;
  quantity: number;
	price: number;
}

export default interface IOrders {
  _id: string;
  id?: string;
	userId: string;
	date: Date;
	deliveryAddress: string;
	paymentMethod: string;
	status: string;
	total: number;
	productsOrder: TProductsOrder[];
}
