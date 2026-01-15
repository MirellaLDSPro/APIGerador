import express from 'express';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rotas
app.use(routes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
