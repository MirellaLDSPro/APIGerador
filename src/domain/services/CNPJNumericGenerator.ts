import { IDocumentGenerator } from './IDocumentGenerator';
import { CNPJ } from '../entities/CNPJ';

/**
 * Serviço de geração de CNPJ Numérico
 * Implementa IDocumentGenerator
 * Aplica Single Responsibility (SOLID)
 */
export class CNPJNumericGenerator implements IDocumentGenerator {
    /**
     * Gera um CNPJ numérico válido
     */
    public generate(): string {
        let cnpj = '';

        // Gera 8 dígitos aleatórios
        for (let i = 0; i < 8; i++) {
            cnpj += Math.floor(Math.random() * 10);
        }

        // Adiciona o número de filial (0001)
        cnpj += '0001';

        // Calcula primeiro dígito verificador
        cnpj += this.calculateCheckDigit(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

        // Calcula segundo dígito verificador
        cnpj += this.calculateCheckDigit(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

        // Valida e retorna
        const cnpjEntity = CNPJ.create(cnpj, true);
        return cnpjEntity.getValue();
    }

    /**
     * Calcula o dígito verificador do CNPJ
     */
    private calculateCheckDigit(cnpj: string, weights: number[]): number {
        let soma = 0;

        for (let i = 0; i < weights.length; i++) {
            soma += parseInt(cnpj[i]) * weights[i];
        }

        let resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}
