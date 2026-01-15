import { Router } from 'express';
import { DocumentController } from '../controllers/DocumentController';

/**
 * Configuração de rotas da API
 * Aplica Single Responsibility (SOLID)
 */
export class DocumentRoutes {
    public static create(controller: DocumentController): Router {
        const router = Router();

        // Rota raiz
        router.get('/', (req, res) => controller.getInfo(req, res));

        // Rotas de geração de documentos
        router.get('/cpf', (req, res) => controller.generateCPF(req, res));
        router.get('/cnpj-numerico', (req, res) => controller.generateCNPJNumeric(req, res));
        router.get('/cnpj-alfanumerico', (req, res) => controller.generateCNPJAlphanumeric(req, res));

        return router;
    }
}
