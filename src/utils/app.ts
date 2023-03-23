import express from 'express';
import cors from 'cors';
import routes from '../Routes';
import handleErrors from '../Middlewares/handleErrors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/users', routes.userRouter);
app.use('/products', routes.productRouter);
app.use('/cart', routes.cartRouter);
app.use(handleErrors);

export default app;
