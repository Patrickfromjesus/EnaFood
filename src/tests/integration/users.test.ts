import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../utils/app';
import { Model } from 'mongoose';
import User from '../../Domains/User';
import errors from '../../Errors/errors';
import errorsStatus from '../../Errors/errorsStatus';

chai.use(chaiHttp);
const invalidInfos = ['maiconJordan.com', '12345', 'maicon'];
const validLogin = { email: "cristiano@ronaldo7.com", password: "euSouOMilhor" };
const fakeId = '640f2c72321fbdc495775407';

describe('Testes do Schema User', function() {
	let httpResponse;

	it('Teste de tentativa de fazer login com email inválido para "POST /users/login"', async function() {
		httpResponse = await chai.request(app)
			.post('/users/login').send({ email: invalidInfos[0], password: '123456' });
		expect(httpResponse.status).to.be.equal(errorsStatus.BAD_REQUEST);
		expect(httpResponse.body.message).to.be.equal(errors.badRequestError.message);
	});

	it('Teste de tentativa de fazer login com senha inválida para "POST /users/login"', async function() {
		httpResponse = await chai.request(app)
			.post('/users/login').send({ email: 'cristiano@ronaldo.com', password: invalidInfos[1] });
		expect(httpResponse.status).to.be.equal(errorsStatus.BAD_REQUEST);
		expect(httpResponse.body.message).to.be.equal(errors.badRequestError.message);
	});

	it('Teste de tentativa de fazer login sem o campo "email" para "POST /users/login"', async function() {
		httpResponse = await chai.request(app)
			.post('/users/login').send({ password: '123456' });
		expect(httpResponse.status).to.be.equal(errorsStatus.BAD_REQUEST);
		expect(httpResponse.body.message).to.be.equal(errors.badRequestError.message);
	});

	it('Teste de tentativa de fazer login sem o campo "password" para "POST /users/login"', async function() {
		httpResponse = await chai.request(app)
			.post('/users/login').send({ email: 'cristiano@ronaldo.com' });
		expect(httpResponse.status).to.be.equal(errorsStatus.BAD_REQUEST);
		expect(httpResponse.body.message).to.be.equal(errors.badRequestError.message);
	});

	it('Teste de tentativa de fazer login com email não existente para "POST /users/login"', async function() {
		sinon.stub(Model, 'findOne').resolves(undefined);
		httpResponse = await chai.request(app)
			.post('/users/login').send(validLogin);
		expect(httpResponse.status).to.be.equal(errorsStatus.NOT_FOUND);
		expect(httpResponse.body.message).to.be.equal(errors.invalidCredentialsError.message);
	});

	it('Teste de tentativa de fazer login com sucesso para "POST /users/login"', async function() {
		sinon.stub(Model, 'findOne').resolves({ _id: fakeId });
		httpResponse = await chai.request(app)
			.post('/users/login').send(validLogin);
		expect(httpResponse.status).to.be.equal(errorsStatus.OK);
		expect(httpResponse.body).to.have.property('token');
	});

	afterEach(function(){ sinon.restore() });
});
