
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pokemonRoutes from './routes/pokemon.routes'; 


dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json()); 


app.get('/', (req: Request, res: Response) => {
  res.send('API de Pokémon (Taller 2) funcionando con TypeScript');
});


app.use('/api', pokemonRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});