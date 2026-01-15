import { IDocumentGenerator } from '../../domain/services/IDocumentGenerator';
import { GeneratedDocumentDTO } from '../../shared/dto/GeneratedDocumentDTO';

/**
 * Caso de uso para gerar um documento
 * Orquestração da lógica de negócio
 * Aplica Dependency Inversion (SOLID)
 */
export class GenerateDocumentUseCase {
    constructor(private readonly generator: IDocumentGenerator) {}

    /**
     * Executa o caso de uso
     */
    public execute(type: string): GeneratedDocumentDTO {
        const document = this.generator.generate();
        return new GeneratedDocumentDTO(document, type);
    }
}
