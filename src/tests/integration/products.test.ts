import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../utils/app';
import { Model } from 'mongoose';
import { productsPage0 } from './mocks/products';
import Product from '../../Domains/Product';

chai.use(chaiHttp);

describe('Testes do Schema "Products"', function() {
	let httpResponse;

	it('Teste de fluxo para retornar produtos com sucesso para "GET /products"', async function() {
		const productsStub = sinon.stub();
		const skipStub = sinon.stub().returns({ limit: sinon.stub().resolves(productsPage0) });
		productsStub.returns({ skip: skipStub });
		sinon.replace(Model, 'find', productsStub);
		const resultDomain = productsPage0.map((product) => new Product(product));

		httpResponse = await chai.request(app).get('/products');
		expect(httpResponse.status).to.be.deep.equal(200);
		expect(httpResponse.body).to.be.deep.equal(resultDomain);
	});

	it('Teste de fluxo para falha para "GET /products", simulando um erro interno', async function() {
		sinon.stub(Model, 'find').rejects();
		const resultDomain = productsPage0.map((product) => new Product(product));

		httpResponse = await chai.request(app).get('/products');
		expect(httpResponse.status).to.be.deep.equal(500);
	});

afterEach(function() { sinon.restore() });
});
