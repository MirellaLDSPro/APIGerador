import express, { Request, Response } from 'express';
import { gerarCPF, gerarCNPJ, gerarCNPJNumerico } from '../services/documentGenerator';

const router = express.Router();

// Rota raiz - informações da API
router.get('/api', (req: Request, res: Response) => {
    res.json({
        message: 'API de Geração de Documentos',
        endpoints: {
            cpf: '/api/cpf',
            cnpjAlfanumerico: '/api/cnpj-alfanumerico',
            cnpjNumerico: '/api/cnpj-numerico'
        }
    });
});

// Rota para gerar CPF
router.get('/api/cpf', (req: Request, res: Response) => {
    res.json({ cpf: gerarCPF() });
});

// Rota para gerar CNPJ alfanumérico
router.get('/api/cnpj-alfanumerico', (req: Request, res: Response) => {
    res.json({ cnpj: gerarCNPJ() });
});

// Rota para gerar CNPJ numérico
router.get('/api/cnpj-numerico', (req: Request, res: Response) => {
    res.json({ cnpj: gerarCNPJNumerico() });
});

export default router;
