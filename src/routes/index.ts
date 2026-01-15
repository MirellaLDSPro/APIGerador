import express, { Request, Response } from 'express';
import { gerarCPF, gerarCNPJ, gerarCNPJNumerico } from '../services/documentGenerator';

const router = express.Router();

// Rota raiz - informações da API
router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'API de Geração de Documentos',
        endpoints: {
            cpf: '/cpf',
            cnpjAlfanumerico: '/cnpj-alfanumerico',
            cnpjNumerico: '/cnpj-numerico'
        }
    });
});

// Rota para gerar CPF
router.get('/cpf', (req: Request, res: Response) => {
    res.json({ cpf: gerarCPF() });
});

// Rota para gerar CNPJ alfanumérico
router.get('/cnpj-alfanumerico', (req: Request, res: Response) => {
    res.json({ cnpj: gerarCNPJ() });
});

// Rota para gerar CNPJ numérico
router.get('/cnpj-numerico', (req: Request, res: Response) => {
    res.json({ cnpj: gerarCNPJNumerico() });
});

export default router;
