const express = require('express');
const app = express();
const port = 3000;

// Gerador de CPF e CNPJ

function gerarCPF() {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }
    cpf += calcularDigitoCPF(cpf);
    cpf += calcularDigitoCPF(cpf);
    return cpf;
}

function calcularDigitoCPF(cpf) {
    let soma = 0;
    let peso = cpf.length + 1;
    for (let i = 0; i < cpf.length; i++) {
        soma += parseInt(cpf[i]) * peso--;
    }
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function gerarCNPJ() {
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

function calcularDigitoCNPJ(cnpj) {
    const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = cnpj.length - 1; i >= 0; i--) {
        soma += parseInt(cnpj[i]) * pesos[pesos.length - cnpj.length + i];
    }
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function gerarCNPJNumerico() {
    let cnpj = '';
    for (let i = 0; i < 8; i++) {
        cnpj += Math.floor(Math.random() * 10);
    }
    cnpj += '0001';
    cnpj += calcularDigitoCNPJ(cnpj.substring(0, 12));
    cnpj += calcularDigitoCNPJ(cnpj.substring(0, 13));
    return cnpj;
}

// Endpoints da API

app.get('/cpf', (req, res) => {
    res.json({ cpf: gerarCPF() });
});

app.get('/cnpj-alfanumerico', (req, res) => {
    res.json({ cnpj: gerarCNPJ() });
});

app.get('/cnpj-numerico', (req, res) => {
    res.json({ cnpj: gerarCNPJNumerico() });
});

app.get('/', (req, res) => {
    res.json({
        message: 'API de Geração de Documentos',
        endpoints: {
            cpf: '/cpf',
            cnpjAlfanumerico: '/cnpj-alfanumerico',
            cnpjNumerico: '/cnpj-numerico'
        }
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});