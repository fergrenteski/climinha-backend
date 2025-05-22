import { Router } from 'express';
import { prisma } from './database';

export const router = Router();

router.post('/temperatura', async (req: any, res: any) => {
    const { leituras } = req.body;

    try {
        if (!Array.isArray(leituras)) return res.status(400).json({ error: "Leituras inválidas" })

        const dados: { temp: number; timestamp: Date }[] = [];

        for (const leitura of leituras) {
            try {
                const timestamp = new Date(leitura.timestamp);
                if (isNaN(timestamp.getTime())) throw new Error("Data inválida");

                dados.push({
                    temp: leitura.temp,
                    timestamp
                });
            } catch (e) {
                console.warn(`Leitura ignorada por erro de data: ${JSON.stringify(leitura)}`);
            }
        }

        if (dados.length === 0) return res.status(400).json({ error: "Nenhuma leitura válida recebida." });

        await prisma.temperatura.createMany({
            data: dados
        });

        res.status(201).json({ message: "Dados salvos!", validCount: dados.length });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Erro ao adicionar temperaturas" });
    }
});

router.get('/temperatura', async (req, res) => {
    try {
        const dados = await prisma.temperatura.findMany({
            orderBy: {
                timestamp: 'asc'  // ordena do mais antigo para o mais novo
            }
        });

        // Retornar no formato { timestamp: string, temperatura: number }
        const resposta = dados.map(d => ({
            timestamp: d.timestamp.toISOString(),
            temp: d.temp
        }));

        res.json(resposta);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro ao buscar temperaturas" });
    }
});
