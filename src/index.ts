import { Server } from './infrastructure/http/Server';

/**
 * Entry point da aplicação
 * Inicializa o servidor Express
 */
const port = parseInt(process.env.PORT || '3000', 10);
const server = new Server(port);

server.start();
