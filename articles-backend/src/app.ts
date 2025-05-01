import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import articleRoutes from './routes/articleRoutes';
import tgRoutes from "./routes/tgRoutes"
import likeRoutes from "./routes/likeRoutes"

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/tg', tgRoutes);

export default app;
