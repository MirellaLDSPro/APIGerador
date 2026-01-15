import { IDocumentGenerator } from './IDocumentGenerator';
import { CNPJ } from '../entities/CNPJ';

/**
 * Serviço de geração de CNPJ Alfanumérico (formato 2026+)
 * Implementa IDocumentGenerator
 * Aplica Single Responsibility (SOLID)
 */
export class CNPJAlphanumericGenerator implements IDocumentGenerator {
    private readonly chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /**
     * Gera um CNPJ alfanumérico válido
     */
    public generate(): string {
        let cnpj = '';

        // Gera 12 caracteres alfanuméricos aleatórios
        for (let i = 0; i < 12; i++) {
            cnpj += this.chars[Math.floor(Math.random() * this.chars.length)];
        }

        // Calcula primeiro dígito verificador
        cnpj += this.calculateCheckDigit(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

        // Calcula segundo dígito verificador
        cnpj += this.calculateCheckDigit(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

        // Valida e retorna
        const cnpjEntity = CNPJ.create(cnpj, false);
        return cnpjEntity.getValue();
    }

    /**
     * Calcula o dígito verificador do CNPJ alfanumérico
     */
    private calculateCheckDigit(cnpj: string, weights: number[]): number {
        let soma = 0;

        for (let i = 0; i < weights.length; i++) {
            let char = cnpj[i];
            // Converte caractere para número (0-9 = 0-9, A-Z = 10-35)
            let val = isNaN(parseInt(char)) ? char.charCodeAt(0) - 55 : parseInt(char);
            soma += val * weights[i];
        }

        let resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}
