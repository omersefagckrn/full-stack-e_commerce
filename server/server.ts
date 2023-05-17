import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

const app: Application = express();
const PORT: number | string = process.env.PORT || 4000;

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
mongoose.set('strictQuery', true);

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: './server/.env' });
}
app.use('/api/users/', userRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/orders/', orderRoutes);

(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
		app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
		console.log('Connected to the db: Mongoose ✅');
	} catch (error) {
		console.log('Failed to connect to the db: ❌', error);
	}
})();
