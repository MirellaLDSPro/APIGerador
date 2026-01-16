import type { VercelRequest, VercelResponse } from '@vercel/node';

function gerarCNPJ(): string {
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

export default function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ cnpj: gerarCNPJ() });
}
