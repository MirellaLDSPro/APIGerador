/**
 * Entidade que representa um CNPJ válido
 * Domain Entity - encapsula a lógica de CNPJ
 */
export class CNPJ {
    private readonly value: string;
    private readonly isNumeric: boolean;

    private constructor(value: string, isNumeric: boolean) {
        this.value = value;
        this.isNumeric = isNumeric;
    }

    /**
     * Factory method para criar um CNPJ a partir de um valor
     */
    public static create(value: string, isNumeric: boolean = true): CNPJ {
        if (!this.isValid(value, isNumeric)) {
            throw new Error('CNPJ inválido');
        }
        return new CNPJ(value, isNumeric);
    }

    /**
     * Valida se um CNPJ é válido
     */
    private static isValid(cnpj: string, isNumeric: boolean): boolean {
        if (isNumeric) {
            // CNPJ numérico: 14 dígitos
            if (!/^\d{14}$/.test(cnpj)) return false;

            // Verifica se todos os dígitos são iguais
            if (/^(\d)\1{13}$/.test(cnpj)) return false;

            return this.validateCNPJCheckDigits(cnpj);
        } else {
            // CNPJ alfanumérico: 12 caracteres alfanuméricos + 2 dígitos
            if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpj)) return false;

            return this.validateCNPJCheckDigits(cnpj);
        }
    }

    /**
     * Valida os dígitos verificadores do CNPJ
     */
    private static validateCNPJCheckDigits(cnpj: string): boolean {
        const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        let soma = 0;
        for (let i = 0; i < 12; i++) {
            let char = cnpj[i];
            let val = isNaN(parseInt(char)) ? char.charCodeAt(0) - 55 : parseInt(char);
            soma += val * pesos1[i];
        }
        let dv1 = 11 - (soma % 11);
        dv1 = dv1 > 9 ? 0 : dv1;

        if (parseInt(cnpj[12]) !== dv1) return false;

        soma = 0;
        for (let i = 0; i < 13; i++) {
            let char = cnpj[i];
            let val = isNaN(parseInt(char)) ? char.charCodeAt(0) - 55 : parseInt(char);
            soma += val * pesos2[i];
        }
        let dv2 = 11 - (soma % 11);
        dv2 = dv2 > 9 ? 0 : dv2;

        return parseInt(cnpj[13]) === dv2;
    }

    /**
     * Retorna o valor do CNPJ
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * Retorna o CNPJ formatado
     * Numérico: XX.XXX.XXX/XXXX-XX
     * Alfanumérico: XXXXXX/XXXX-XX
     */
    public getFormatted(): string {
        if (this.isNumeric) {
            return this.value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
        return this.value.replace(/^(.{6})(.{4})(.{2})$/, '$1/$2-$3');
    }

    /**
     * Retorna se é numérico ou alfanumérico
     */
    public getType(): 'numeric' | 'alphanumeric' {
        return this.isNumeric ? 'numeric' : 'alphanumeric';
    }

    /**
     * Representação em string
     */
    public toString(): string {
        return this.value;
    }
}
