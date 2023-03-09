import express from 'express';
import cors from 'cors';
import routes from '../Routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/users', routes.userRouter);
app.use('/orders', routes.orderRouter);
app.use('/products', routes.productRouter);

export default app;
