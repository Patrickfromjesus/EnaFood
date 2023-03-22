import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../utils/app';
import { Model } from 'mongoose';
import errorsStatus from '../../Errors/errorsStatus';
import errors from '../../Errors/errors';

chai.use(chaiHttp);

const validLogin = {
  "email": "jamal_musiala@email.com",
  "password": "jamal123"
};
const fakeId = '640f24a70fdff89cde485d61';
const fakeDeleteProduct = {
  "productId": "640b73b7385ecf3122b585c8",
  "price": 20.99
};
const fakeRemoveProduct = {
  "productId": "640b73b7385ecf3122b585c8",
  "price": 20.99,
	"quantity": 1
};

describe('Testes de fluxo do Schema Cart', function() {
	let httpResponse;

	it('Teste se cria um carrinho sem passar token para "POST /cart"', async function() {
		httpResponse = await chai.request(app).post('/cart');
		expect(httpResponse.status).to.be.equal(errorsStatus.UNAUTHORIZED);
		expect(httpResponse.body.message).to.be.equal(errors.invalidTokenError.message);
	});

	it('Teste se adiciona um produto ao carrinho com campos inválidos para "POST /cart/addProduct"', async function() {
		httpResponse = await chai.request(app).post('/cart/addProduct');
		expect(httpResponse.status).to.be.equal(errorsStatus.BAD_REQUEST);
		expect(httpResponse.body.message).to.be.equal(errors.badRequestError.message);
	});

	it('Teste se remove uma quantidade de um produto com campos inválidos para "POST /cart/removeProducts"', async function() {
		httpResponse = await chai.request(app).post('/cart/removeProducts');
		expect(httpResponse.status).to.be.equal(errorsStatus.BAD_REQUEST);
		expect(httpResponse.body.message).to.be.equal(errors.badRequestError.message);
	});

	it('Teste se remove uma quantidade de um produto que não existe no carrinho para "POST /cart/removeProducts"', async function() {
		sinon.stub(Model, 'findOne').resolves(false);
		httpResponse = await chai.request(app).post('/cart/removeProducts').send(fakeRemoveProduct);
		expect(httpResponse.status).to.be.equal(errorsStatus.BAD_REQUEST);
		expect(httpResponse.body.message).to.be.equal(errors.invalidProductError.message);
	});

	it('Teste se remove um produto do carrinho que não existe para "DELETE /cart"', async function() {
		sinon.stub(Model, 'findOne').resolves({ _id: fakeId });
		sinon.stub(Model, 'findOneAndUpdate').resolves(false);
		const { body } = await chai.request(app)
			.post('/users/login').send(validLogin);
		httpResponse = await chai.request(app).delete('/cart').send(fakeDeleteProduct).set({ "Authorization": `${body.token}` })
		.then((res) => {
			expect(res.status).to.be.equal(errorsStatus.BAD_REQUEST);
			expect(res.body.message).to.be.equal(errors.invalidProductError.message);
		});
		
	});

	afterEach(function() { sinon.restore() });
});