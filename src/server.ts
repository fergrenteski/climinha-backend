import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { router } from './routes';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/', router);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
