import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import { generateToken } from '../../../security/auth';
import UserService from '../../../Services/userService';
import { token, infos } from './Mocks/userMocks';

describe('Testes da camada Service do Schema User', async function () {
	const email = 'maicon_jordan12@email.com';
	const password = 'maiconjordan12';
	const randomId = '640f2c72321fbdc495775407';	

	it('1. Teste de login sendo realizado com sucesso', async function () {
		Sinon.stub(Model, 'findOne').resolves({ _id: randomId });
		const result = await new UserService().loginUser({ email, password });
		expect(typeof(result)).to.be.equal('string');
	});

	it('2. Teste de login sendo realizado com usuário não cadastrado', async function () {
		Sinon.stub(Model, 'findOne').resolves(false);
		try {
			await new UserService().loginUser({ email, password });
		} catch (error) {
			expect((error as Error).message).to.be.equal('Invalid email address or password');
		}
	});

	it('3. Teste de cadastro sendo realizado com sucesso', async function () {
		Sinon.stub(Model, 'findOne').resolves(false);
		Sinon.stub(Model, 'create').resolves({ _id: randomId } as any);
		const result = await new UserService().createUser(infos);
		expect(typeof(result)).to.be.equal('string');
	});

	it('4. Teste de cadastro sendo realizado com usuário já existente', async function () {
		Sinon.stub(Model, 'findOne').resolves(true);
		try {
			await new UserService().createUser(infos);
		} catch (error) {
			expect((error as Error).message).to.be.equal('User already exists');
		}
	});

	afterEach(function () { Sinon.restore(); });
});