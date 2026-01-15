import express, { Express } from 'express';
import { DocumentRoutes } from '../routes/DocumentRoutes';
import { DocumentController } from '../controllers/DocumentController';
import { GenerateDocumentUseCase } from '../../application/usecases/GenerateDocumentUseCase';
import { CPFGenerator } from '../../domain/services/CPFGenerator';
import { CNPJNumericGenerator } from '../../domain/services/CNPJNumericGenerator';
import { CNPJAlphanumericGenerator } from '../../domain/services/CNPJAlphanumericGenerator';

/**
 * Configuração do servidor Express
 * Responsável pela injeção de dependências e setup inicial
 */
export class Server {
    private app: Express;
    private port: number;

    constructor(port: number = 3000) {
        this.app = express();
        this.port = port;
        this.setupMiddlewares();
        this.setupRoutes();
    }

    /**
     * Configura middlewares
     */
    private setupMiddlewares(): void {
        this.app.use(express.json());
    }

    /**
     * Configura as rotas e injeção de dependências
     */
    private setupRoutes(): void {
        // Injeção de dependências (DI)
        const cpfGenerator = new CPFGenerator();
        const cpfUseCase = new GenerateDocumentUseCase(cpfGenerator);

        const cnpjNumericGenerator = new CNPJNumericGenerator();
        const cnpjNumericUseCase = new GenerateDocumentUseCase(cnpjNumericGenerator);

        const cnpjAlphanumericGenerator = new CNPJAlphanumericGenerator();
        const cnpjAlphanumericUseCase = new GenerateDocumentUseCase(cnpjAlphanumericGenerator);

        // Criar controlador com todos os usecases
        const documentController = new DocumentController(
            cpfUseCase,
            cnpjNumericUseCase,
            cnpjAlphanumericUseCase
        );

        // Registrar rotas
        this.app.use('/', DocumentRoutes.create(documentController));
    }

    /**
     * Inicia o servidor
     */
    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${this.port}`);
        });
    }
}
