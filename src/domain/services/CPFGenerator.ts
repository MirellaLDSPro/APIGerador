import { IDocumentGenerator } from './IDocumentGenerator';
import { CPF } from '../entities/CPF';

/**
 * Serviço de geração de CPF
 * Implementa IDocumentGenerator
 * Aplica Single Responsibility (SOLID)
 */
export class CPFGenerator implements IDocumentGenerator {
    /**
     * Gera um CPF válido
     */
    public generate(): string {
        let cpf = '';

        // Gera 9 dígitos aleatórios
        for (let i = 0; i < 9; i++) {
            cpf += Math.floor(Math.random() * 10);
        }

        // Calcula primeiro dígito verificador
        cpf += this.calculateCPFCheckDigit(cpf);

        // Calcula segundo dígito verificador
        cpf += this.calculateCPFCheckDigit(cpf);

        // Valida e retorna
        const cpfEntity = CPF.create(cpf);
        return cpfEntity.getValue();
    }

    /**
     * Calcula o dígito verificador do CPF
     */
    private calculateCPFCheckDigit(cpf: string): number {
        let soma = 0;
        let peso = cpf.length + 1;

        for (let i = 0; i < cpf.length; i++) {
            soma += parseInt(cpf[i]) * peso--;
        }

        let resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}
