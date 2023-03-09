import mongoose from 'mongoose';
import 'dotenv/config';

const mongoDbUri = process.env.MONGO_URI ?? '';

const connectToDatabase = async (uri = mongoDbUri) => mongoose.connect(uri);

export default connectToDatabase;
