import { NextFunction, Request, Response } from 'express';
import errors from '../Errors/errors';
import ProductService from '../Services/productService';

const validateProduct = async (id: string) => {
	if (!id) throw errors.badRequestError;
	const data = await new ProductService().getProductById(id);
	if (!data) throw errors.invalidProductError;
}

export const validateQuantity = (quantity: number) => {
	if (quantity === undefined || quantity < 0) throw errors.badRequestError;
}

const validatePrice = (price: number) => {
	if (price === undefined || price < 0) throw errors.badRequestError;
}

export const validateCart = async (req: Request, _res: Response, next: NextFunction) => {
	const { productId, quantity, price } = req.body;
	try {
		await validateProduct(productId);
		validateQuantity(quantity);
		validatePrice(price);
		next();
	} catch (error) {
		next(error);
	}
}
