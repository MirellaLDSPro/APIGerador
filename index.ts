import express from 'express';
import { Server } from './src/infrastructure/http/Server';

/**
 * Entry point para Vercel
 * Importa Express diretamente na raiz para Vercel detectar
 */
const port = parseInt(process.env.PORT || '3000', 10);
const server = new Server(port);
const app = server.getApp();

// Exportar para Vercel/serverless
export default app;

// Iniciar em desenvolvimento local
if (require.main === module) {
    server.start();
}
