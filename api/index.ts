import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Server } from '../src/infrastructure/http/Server';

// Criar instância do servidor
const server = new Server();
const app = server.getApp();

/**
 * Handler padrão do Vercel
 * Todas as requisições são rotadas para a aplicação Express
 */
export default (req: VercelRequest, res: VercelResponse) => {
    return app(req, res);
};
