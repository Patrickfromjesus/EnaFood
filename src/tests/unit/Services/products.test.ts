import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Product from '../../../Domains/Product';
import ProductService from '../../../Services/productService';
import { productsPage0 } from './Mocks/productsMock';

describe('Testes da camada Service do Schema Product', async function () {
	it('1. Teste retornando os produtos com sucesso', async function () {
		const productsStub = Sinon.stub();
		const skipStub = Sinon.stub().returns({ limit: Sinon.stub().resolves(productsPage0) });
		productsStub.returns({ skip: skipStub });
		const productDomain = productsPage0.map((elem) => new Product(elem));

		// Substitui o modelo pelo stub criado
		Sinon.replace(Model, 'find', productsStub);

		const result = await new ProductService().getAllProducts(0);

		expect(result).to.be.deep.equal(productDomain);
	});


	it('2. Teste retornando os produtos pelo id com sucesso', async function () {
		Sinon.stub(Model, 'findOne').resolves(productsPage0[0]);
		const productDomain = productsPage0[0];
		const result = await new ProductService().getProductById(productsPage0[0]._id);
		expect(result).to.be.deep.equal(productDomain);
	});

	afterEach(function () { Sinon.restore(); });
});
