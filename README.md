

<h3 align="center">ENAFOOD</h3>
<br/>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Patrickfromjesus/EnaFood.svg)](https://github.com/Patrickfromjesus/EnaFood/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> O projeto EnaFood consiste em uma API que gerencia usuários, produtos e um carrinho de compras de uma aplicação de delivery.
    <br> 
</p>

## 📝 Conteúdo

- [Sobre](#about)
- [Rodando localmente](#getting_started)
- [Funcionamento](#usage)
- [Principais Ferramentas](#built_using)
- [Autor](#authors)
- [Justificativas do projeto](#whyWasUsedThat)

## 🧐 Sobre o projeto <a name = "about"></a>

O propósito do projeto era construir uma API onde um usuário faz login ou registra-se e é gerando um carrinho para ele, automaticamente. A partir do momento em que está ativo, pode manipular o carrinho, inserindo, removendo e alterando a quantidade de itens do mesmo. A aplicação foi baseada nas instruções enviadas para o desafio técnico da empresa [ENACOM](https://www.enacom.com.br/). 

## 🏁 Rodando localmente <a name = "getting_started"></a>

Para rodar localmente, execute os seguintes passos no terminal da sua máquina.

### Pré-requisitos

Como clonar o projeto:

```
git clone https://github.com/Patrickfromjesus/EnaFood.git
cd EnaFood
```

### Instalação

Rode os comandos a seguir em seu terminal. 

Na pasta raiz do projeto:

```
npm install
ou
yarn install
```

Configuração do arquivo .env:

```
MONGO_URI='mongodb://<HOST>:<PORTA DO MONGO>/<NOME DO DB>'
PORT=<PORTA DA BACKEND>
JWT_SECRET=<CHAVE DE CRIPTOGRAFIA DO JWT>

exemplo:

MONGO_URI='mongodb://localhost:27017/DbFood'
PORT=3001
JWT_SECRET='segredo'
```

Para subir o backend rode:

```
npm run docker:up (caso não tenha o mongo instalado localmente).
npm run dev (para subir a aplicação).
```

## 🔧 Rodar os testes <a name = "tests"></a>

Foram realizados testes de unidades das camadas Service e Controller na aplicação (Ainda em desenvolvimento).

### Como rodar 

```
npm run test
```

## 🎈 Funcionamento <a name="usage"></a>

### Endpoint `/products`
É usada uma rota <strong>GET</strong> para retornar todos os produtos disponíveis, de 10 em 10 resultados para paginação. Se não for especificada a página, será retornada a página 0 (zero), com os 10 primeiros resultados.

<details>
  <summary><strong>Exemplo de retorno da API /products/?page=0</strong></summary><br />

  ```json
[
  {
    "id": "640b73b7385ecf3122b585c7",
    "name": "Produto A",
    "description": "Descrição do Produto A",
    "price": 29.99,
    "imgUrl": "https://exemplo.com/produto-e"
  },
  {
    "id": "640b73b7385ecf3122b585c8",
    "name": "Produto B",
    "description": "Descrição do Produto B",
    "price": 29.99,
    "imgUrl": "https://exemplo.com/produto-e"
  },
  {
    "id": "640b73b7385ecf3122b585c9",
    "name": "Produto C",
    "description": "Descrição do Produto C",
    "price": 29.99,
    "imgUrl": "https://exemplo.com/produto-e"
  },
  ...
]
```

</details>
<br/>

### Endpoint `/users`
São usadas duas rotas <strong>POST</strong> para registrar (`/create`) um usuário, passando pelo body as informações necessárias e uma rota para fazer login (`/login`), passando pelo body o email e senha. Somente serão aceitos emails válidos e únicos, senhas com pelo menos 6 caracteres e nome com no mínimo 10.

<details>
  <summary><strong>Exemplo de body para `/users/create`</strong></summary><br />

  ```json
  {
"name": "Jamal Musiala",
"email": "jamal_musiala@email.com",
"password": "jamal123",
"address": "Rua Jamal, 18",
"paymentMethod": "Dinheiro"
}
```
</details>

<details>
  <summary><strong>Exemplo de retorno quando um usuário é retornado</strong></summary><br />

  ```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGYyNGE3MGZkZmY4OWNkZTQ4NWQ2MSIsImlhdCI6MTY3ODcxNDAyMywiZXhwIjoxNjc4NzMyMDIzfQ.2bMPZ7elmN4GsvhnHeoMWTqDBkJrjnNGWQCfKosk8z4"
}
```
</details>

<details>
  <summary><strong>Exemplo de body para `/users/login`</strong></summary><br />

  ```json
  {
"email": "jamal_musiala@email.com",
"password": "jamal123"
}
```
</details>

<details>
  <summary><strong>Exemplo de retorno para quando um login é feito com sucesso</strong></summary><br />

  ```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGIzMTViOTQ2OGM2YzRlMjBkZmU4OCIsImlhdCI6MTY3ODcxNDE0MywiZXhwIjoxNjc4NzMyMTQzfQ.mFhTppzmCFwMqnOPc2YmRWOhyaYDgRdKisOUY8ot_1E"
}
```
</details>
<br/>

### Endpoint `/cart`
São usadas três rotas, duas do tipo <strong>POST</strong> para criar um carrinho para um usuário e outra para adicionar item ou alterar quantidade de itens já existentes e uma do tipo <strong>DELETE</strong> para retirar completamente um produto do carrinho. Todas as informações necessárias são passadas pelo body da requisição e espera-se o token de acesso para autorização da mesma.

<details>
  <summary><strong>Para criar um carrinho, basta fazer uma requisição <strong>POST</strong> para `/cart` com um token válido no header, como no exemplo abaixo. O carrinho iniciará vazio.</strong></summary><br />

  ```json
  Exemplo de token:

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGIzMTViOTQ2OGM2YzRlMjBkZmU4OCIsImlhdCI6MTY3ODcxNDE0MywiZXhwIjoxNjc4NzMyMTQzfQ.mFhTppzmCFwMqnOPc2YmRWOhyaYDgRdKisOUY8ot_1E"

  Exemplo de carrinho após criado:

  {
  "id": "640f277c0fdff89cde485d68",
  "userId": "640b315b9468c6c4e20dfe88",
  "products": [],
  "total": 0
}
```
</details>
<br/>
<details>
  <summary><strong>Para adicionar um item ao carrinho, basta fazer uma requisição <strong>POST</strong> para `/cart/addProduct` com um token válido no header e as informações no body (Essa requisição tem por função estritamente guardar as informações do carrinho).</strong></summary><br />

  ```json
  Exemplo de body:

  {
  "productId": "640b73b7385ecf3122b585c9",
  "quantity": 2,
  "price": 29.99,
  "total": 149.95
}

Sendo o `productId` o id do produto adicionado, `quantity`, a quantidade daquele produto que foram adicionadas, `price`, o preço unitário do produto e `total`, o valor total já atualizado do carrinho POR COMPLETO, o subTotal será calculado automaticamente.

  Retorno de sucesso:
  
 {
  "message": "product successfully added!"
}

Exemplo de carrinho com mais de um item adicionados:

  {
  "id": "640f277c0fdff89cde485d68",
  "userId": "640b315b9468c6c4e20dfe88",
  "products": [
    {
    "productId": "640b73b7385ecf3122b585c9",
    "price": 29.99,
    "quantity": 2,
    "subTotal": 59.98,
    "_id": "640f29380fdff89cde485d6f",
  },
  ...
    ],
  "total": 149.95
}
```
</details>
<br/>

<details>
  <summary><strong>Para deletar um produto do carrinho, basta fazer uma requisição <strong>DELETE</strong> para `/cart` com um token válido no header e um body com o id do produto e seu preço. Aqui o total do carrinho se atualiza automaticamente.</strong></summary><br />

  ```json
  Exemplo de token:

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGIzMTViOTQ2OGM2YzRlMjBkZmU4OCIsImlhdCI6MTY3ODcxNDE0MywiZXhwIjoxNjc4NzMyMTQzfQ.mFhTppzmCFwMqnOPc2YmRWOhyaYDgRdKisOUY8ot_1E"

  Exemplo de body:

  {
  "productId": "640b73b7385ecf3122b585c7",
  "price": 29.99
}
```
</details>
<br/>

## Justificativas do projeto <a name = "whyWasUsedThat"></a>
Neste projeto foi utilizada a biblioteca [jsonwebtoken](https://jwt.io/) para fazer a criptografia do token de requisição e controle de fluxo de usuários e o bycript (nativo) para fazer criptografia hash(md5) da senha de usuários.
A biblioteca facilita o processo de requisição, pois é uma tecnologia de fácil implementação, além de trazer
segurança para a aplicação, decodificando e verificando os tokens JWT.
Em consonância, foi utilizado o [dotenv](https://www.dotenv.org/docs), para proteger a chave de segurança do JWT, a porta de exposição da api e a URI do Mongo.
Para o banco de dados, foi escolhido usar um banco não relacional, o [MongoDB](https://www.mongodb.com/) com o ODM [Mongoose](https://mongoosejs.com/), pois facilita a modelagem dos dados retornados com a arquitetura de Domínios. Além disso, também foi usado o modelo de arquitetura MSC (Model-Service-Controller) com Orientação a Objetos, para dividir tarefas e organizar funções, o que facilita a legibilidade e manutenção de código, isolando funções.
Como linguagem principal, optou-se pelo [Typescript](https://www.typescriptlang.org/pt/docs/), em dentrimento do JavaScript puro, para tipagem de dados e segurança contra possíveis erros de digitação e/ou tipagem que poderiam não ser observados à primeira vista, junto com o [Eslint](https://eslint.org/), para a padronização do código e sua legibilidade.
A intenção da API é ajudar na organização e no fluxo do usuário que fará um pedido, adicionando-o ao carrinho de compras, tudo gerenciado pelo Backend.

## ⛏️ Principais tecnologias utilizadas <a name = "built_using"></a>

* [Node.js (Express)](http://expressjs.com/);
* [Typescript](https://www.typescriptlang.org/pt/docs/);
* [Mongoose](https://mongoosejs.com/);
* [dotenv](https://www.dotenv.org/docs);
* [MongoDB](https://www.mongodb.com/);
* [JWT](https://jwt.io/);
* [cors](https://www.npmjs.com/package/cors?activeTab=readme);

## ✍️ Autor <a name = "authors"></a>

- [Patrickfromjesus](https://github.com/Patrickfromjesus)


