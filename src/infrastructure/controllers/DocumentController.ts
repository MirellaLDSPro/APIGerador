import { Request, Response } from 'express';
import { GenerateDocumentUseCase } from '../../application/usecases/GenerateDocumentUseCase';

/**
 * Controlador HTTP para geração de documentos
 * Suporta múltiplos tipos de documentos através de injeção de dependência
 * Aplica Dependency Inversion e Single Responsibility (SOLID)
 */
export class DocumentController {
    constructor(
        private readonly cpfUseCase: GenerateDocumentUseCase,
        private readonly cnpjNumericUseCase: GenerateDocumentUseCase,
        private readonly cnpjAlphanumericUseCase: GenerateDocumentUseCase
    ) {}

    /**
     * Endpoint para gerar CPF
     */
    public async generateCPF(req: Request, res: Response): Promise<void> {
        try {
            const result = this.cpfUseCase.execute('cpf');
            res.json({ cpf: result.document });
        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : 'Erro ao gerar CPF'
            });
        }
    }

    /**
     * Endpoint para gerar CNPJ Numérico
     */
    public async generateCNPJNumeric(req: Request, res: Response): Promise<void> {
        try {
            const result = this.cnpjNumericUseCase.execute('cnpj-numeric');
            res.json({ cnpj: result.document });
        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : 'Erro ao gerar CNPJ'
            });
        }
    }

    /**
     * Endpoint para gerar CNPJ Alfanumérico
     */
    public async generateCNPJAlphanumeric(req: Request, res: Response): Promise<void> {
        try {
            const result = this.cnpjAlphanumericUseCase.execute('cnpj-alphanumeric');
            res.json({ cnpj: result.document });
        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : 'Erro ao gerar CNPJ'
            });
        }
    }

    /**
     * Endpoint raiz - informações da API
     */
    public async getInfo(req: Request, res: Response): Promise<void> {
        res.json({
            message: 'API de Geração de Documentos',
            version: '2.0.0',
            endpoints: {
                cpf: '/cpf',
                cnpjNumeric: '/cnpj-numerico',
                cnpjAlphanumeric: '/cnpj-alfanumerico'
            }
        });
    }
}
