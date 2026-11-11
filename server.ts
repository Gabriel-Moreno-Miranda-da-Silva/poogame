import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// --- ROTAS DA API (MVC) ---
app.get('/api/status', (req: Request, res: Response) => {
  res.json({ message: 'Backend MVC com TypeScript rodando com sucesso!' });
});

// Exemplo de importação futura de rotas:
// import userRoutes from './src/routes/userRoutes';
// app.use('/api/users', userRoutes);


// --- CONFIGURAÇÃO PARA PRODUÇÃO ---
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Servidor TypeScript rodando na porta ${PORT}`);
});