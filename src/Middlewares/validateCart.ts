import { NextFunction, Request, Response } from 'express';
import errors from '../Errors/errors';
import ProductService from '../Services/productService';

const validateProduct = async (id: string) => {
	if (!id) throw errors.badRequestError;
	const data = await new ProductService().getProductById(id);
	if (!data) throw errors.invalidProductError;
}

export const validateQuantity = (quantity: number) => {
	if (!quantity || quantity <= 0) throw errors.badRequestError;
}

const validatePrice = (price: number) => {
	if (!price || price <= 0) throw errors.badRequestError;
}

export const validateCart = (req: Request, _res: Response, next: NextFunction) => {
	const { productId, quantity, price } = req.body;
	try {
		validateProduct(productId);
		validateQuantity(quantity);
		validatePrice(price);
	} catch (error) {
		next(error);
	}
}
