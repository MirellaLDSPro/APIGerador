/**
 * Interface para gerador de documentos
 * Aplica Interface Segregation (SOLID)
 */
export interface IDocumentGenerator {
    generate(): string;
}
