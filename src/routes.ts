import { Router } from 'express';
import { prisma } from './database';

export const router = Router();

router.post('/temperatura', async (req: any, res: any) => {
    const { temp, umidade, light, timestamp } = req.body;

    try {
        if (
            typeof temp !== 'number' ||
            typeof umidade !== 'number' ||
            typeof light !== 'number' ||
            typeof timestamp !== 'number'
        ) {
            return res.status(400).json({ error: "Dados inválidos" });
        }

        // Calcula a data real a partir do millis
        const now = new Date();
        const leituraTimestamp = new Date(now.getTime() - (Date.now() - timestamp));

        if (isNaN(leituraTimestamp.getTime())) {
            return res.status(400).json({ error: "Timestamp inválido" });
        }

        await prisma.temperatura.create({
            data: {
                temp,
                umidade,
                light,
                timestamp: leituraTimestamp
            } as any
        });

        res.status(201).json({ message: "Leitura salva!" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro ao salvar leitura" });
    }
});

router.get('/temperatura', async (req, res) => {
    try {
        const dados = await prisma.temperatura.findMany({
            orderBy: {
                timestamp: 'asc'
            }
        });

        const resposta = dados.map(d => ({
            timestamp: d.timestamp.toISOString(),
            temp: d.temp
        }));

        res.status(200).json(resposta);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro ao buscar temperaturas" });
    }
});
