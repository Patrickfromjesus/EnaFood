import app from './app';
import connectToDatabase from './connection';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3001;

connectToDatabase().then(() => {
  app.listen(PORT, () => console.log('Opon at', PORT));
  console.log('Mongoose open!');
}).catch((err) => {
  console.log(err);
  process.exit(0);
});
