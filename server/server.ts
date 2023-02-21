import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

/* Routes */
import userRoutes from './routes/userRoutes';

const app: Application = express();
const PORT: number | string = process.env.PORT || 4000;

app.use(express.json());
app.use(compression());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
mongoose.set('strictQuery', true);

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: './server/.env' });
}

(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
		console.log('Connected to db ✅');
		app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
	} catch (error) {
		console.log('Failed to connect to the db: ❌', error);
	}
})();

// Path: server/routes/userRoutes.ts
app.use('/api/users/', userRoutes);
