import app from './app';
import connectToDatabase from './connection';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3001;

connectToDatabase().then(() => {
  console.log('Mongoose open!');
  app.listen(PORT, () => console.log('Opon at', PORT));
}).catch((err) => {
  console.log(err);
  process.exit(0);
});
