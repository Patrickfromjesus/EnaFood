import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Cart from '../../../Domains/Cart';
import CartService from '../../../Services/cartService';

describe('Testes da camada Service do Schema Car', function () {
  const input = '640b315b9468c6c4e20dfe88';
  const inputProduct = '640b315b9468c6c4e20dfe89';
  const outputCart = {
    "_id": "640f33e296b04a1845e00735",
    "userId": "640b315b9468c6c4e20dfe88",
    "products": [
      {
        productId: inputProduct,
        quantity: 1,
        price: 29.99,
        subTotal: 29.99,
      }
    ],
    "total": 29.99,
  };

  it('1. Teste para criação de carrinho com sucesso', async function () {
    const output = {
      "_id": "640f33e296b04a1845e00735",
      "userId": "640b315b9468c6c4e20dfe88",
      "products": [],
      "total": 0
    };

    const CartDomain = new Cart(output);

    Sinon.stub(Model, 'findOne').resolves(false);
    Sinon.stub(Model, 'create').resolves(output as any);

    const result = await new CartService().createCart(input);
    expect(result).to.be.deep.equal(CartDomain);
  });

  it('2. Teste para criação de carrinho já existente', async function () {
    const output = {
      "_id": "640f33e296b04a1845e00735",
      "userId": "640b315b9468c6c4e20dfe88",
      "products": [],
      "total": 0
    };

    const CartDomain = new Cart(output);

    Sinon.stub(Model, 'findOne').resolves(output);

    const result = await new CartService().createCart(input);
    expect(result).to.be.deep.equal(CartDomain);
  });


  it('3. Teste para remoção de produto do carrinho com falha', async function () {
    Sinon.stub(Model, 'findOneAndUpdate').resolves(false);
    try {
      const result = await new CartService().removeItem(input, inputProduct, 79.99);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid product');
    }
  });

  it('4. Teste para remoção de produto do carrinho com sucesso', async function () {
    Sinon.stub(Model, 'findOneAndUpdate').resolves(true);
    Sinon.stub(Model, 'updateOne').resolves();
    try {
      const result = await new CartService().removeItem(input, inputProduct, 79.99);
      expect(result).to.be.equal(undefined);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid product');
    }
  });

  it('5. Teste para adição de produtos no carrinho com sucesso, com quantidade igual a zero', async function () {
    Sinon.stub(Model, 'findOneAndUpdate').resolves(true);
    Sinon.stub(Model, 'updateOne').resolves();
    const result = await new CartService().addProduct(input, { products: { productId: inputProduct, price: 0, subTotal: 0, quantity: 0 } });
    expect(result).to.be.equal(undefined);
  });

  it('6. Teste para adição de produtos no carrinho com sucesso, com produto já existente no carrinho', async function () {
    Sinon.stub(Model, 'findOne').resolves(outputCart);
    Sinon.stub(Model, 'findOneAndUpdate').resolves();
    const result = await new CartService().addProduct(input, { products: outputCart.products[0] });
    expect(result).to.be.equal(undefined);
  });

  it('7. Teste para adição de produtos no carrinho com sucesso, sem produtos existentes no carrinho', async function () {
    Sinon.stub(Model, 'findOne').resolves(false);
    Sinon.stub(Model, 'findOneAndUpdate').resolves(outputCart);
    Sinon.stub(Model, 'updateOne').resolves();
    const result = await new CartService().addProduct(input, { products: outputCart.products[0] });
    expect(result).to.be.equal(undefined);
  });

  afterEach(function () { return Sinon.restore(); });
});
