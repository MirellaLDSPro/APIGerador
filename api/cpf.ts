import type { VercelRequest, VercelResponse } from '@vercel/node';

function calcularDigitoCPF(cpf: string): number {
    let soma = 0;
    let peso = cpf.length + 1;
    for (let i = 0; i < cpf.length; i++) {
        soma += parseInt(cpf[i]) * peso--;
    }
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function gerarCPF(): string {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }
    cpf += calcularDigitoCPF(cpf);
    cpf += calcularDigitoCPF(cpf);
    return cpf;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ cpf: gerarCPF() });
}
