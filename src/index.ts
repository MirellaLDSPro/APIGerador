import { Server } from './infrastructure/http/Server';

/**
 * Entry point da aplicação
 * Inicializa o servidor Express
 */
const port = parseInt(process.env.PORT || '3000', 10);
const server = new Server(port);

// Exportar a aplicação para Vercel/Serverless environments
export const app = server.getApp();

// Iniciar o servidor apenas em desenvolvimento local
if (require.main === module) {
    server.start();
}

