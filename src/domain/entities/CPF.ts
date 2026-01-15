/**
 * Entidade que representa um CPF válido
 * Domain Entity - encapsula a lógica de CPF
 */
export class CPF {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    /**
     * Factory method para criar um CPF a partir de um valor
     * Valida antes de criar a instância
     */
    public static create(value: string): CPF {
        if (!this.isValid(value)) {
            throw new Error('CPF inválido');
        }
        return new CPF(value);
    }

    /**
     * Valida se um CPF é válido
     * Implementa os dígitos verificadores
     */
    private static isValid(cpf: string): boolean {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11) return false;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        // Calcula primeiro dígito verificador
        let soma = 0;
        let peso = 10;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf[i]) * peso--;
        }
        let digito1 = 11 - (soma % 11);
        digito1 = digito1 > 9 ? 0 : digito1;

        // Calcula segundo dígito verificador
        soma = 0;
        peso = 11;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf[i]) * peso--;
        }
        let digito2 = 11 - (soma % 11);
        digito2 = digito2 > 9 ? 0 : digito2;

        return parseInt(cpf[9]) === digito1 && parseInt(cpf[10]) === digito2;
    }

    /**
     * Retorna o valor do CPF
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * Retorna o CPF formatado (XXX.XXX.XXX-XX)
     */
    public getFormatted(): string {
        return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    /**
     * Representação em string
     */
    public toString(): string {
        return this.value;
    }
}
