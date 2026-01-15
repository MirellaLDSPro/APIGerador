// Serviço de Geração de CPF e CNPJ

export function gerarCPF(): string {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }
    cpf += calcularDigitoCPF(cpf);
    cpf += calcularDigitoCPF(cpf);
    return cpf;
}

function calcularDigitoCPF(cpf: string): number {
    let soma = 0;
    let peso = cpf.length + 1;
    for (let i = 0; i < cpf.length; i++) {
        soma += parseInt(cpf[i]) * peso--;
    }
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

export function gerarCNPJ(): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let cnpj = '';
    for (let i = 0; i < 12; i++) {
        cnpj += chars[Math.floor(Math.random() * chars.length)];
    }
    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < 12; i++) {
        let val = cnpj.charCodeAt(i) - 48;
        soma += val * pesos1[i];
    }
    let resto = soma % 11;
    let dv1 = resto < 2 ? 0 : 11 - resto;
    cnpj += dv1;
    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    soma = 0;
    for (let i = 0; i < 13; i++) {
        let val = cnpj.charCodeAt(i) - 48;
        soma += val * pesos2[i];
    }
    resto = soma % 11;
    let dv2 = resto < 2 ? 0 : 11 - resto;
    cnpj += dv2;
    return cnpj;
}

function calcularDigitoCNPJ(cnpj: string): number {
    const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = cnpj.length - 1; i >= 0; i--) {
        soma += parseInt(cnpj[i]) * pesos[pesos.length - cnpj.length + i];
    }
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

export function gerarCNPJNumerico(): string {
    let cnpj = '';
    for (let i = 0; i < 8; i++) {
        cnpj += Math.floor(Math.random() * 10);
    }
    cnpj += '0001';
    cnpj += calcularDigitoCNPJ(cnpj.substring(0, 12));
    cnpj += calcularDigitoCNPJ(cnpj.substring(0, 13));
    return cnpj;
}
