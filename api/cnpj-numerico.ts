import type { VercelRequest, VercelResponse } from '@vercel/node';

function calcularDigitoCNPJ(cnpj: string): number {
    const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = cnpj.length - 1; i >= 0; i--) {
        soma += parseInt(cnpj[i]) * pesos[pesos.length - cnpj.length + i];
    }
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function gerarCNPJNumerico(): string {
    let cnpj = '';
    for (let i = 0; i < 8; i++) {
        cnpj += Math.floor(Math.random() * 10);
    }
    cnpj += '0001';
    cnpj += calcularDigitoCNPJ(cnpj.substring(0, 12));
    cnpj += calcularDigitoCNPJ(cnpj.substring(0, 13));
    return cnpj;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ cnpj: gerarCNPJNumerico() });
}
