# Gerador de Documento - API Node.js

Esta API gera números de CPF e CNPJ válidos.

## Como usar

1. Instale as dependências: `npm install`
2. Inicie o servidor: `npm start`
3. A API estará rodando em `http://localhost:3000`

## Endpoints

- `GET /`: Informações sobre a API e endpoints disponíveis.
- `GET /cpf`: Gera um CPF numérico válido.
- `GET /cnpj-alfanumerico`: Gera um CNPJ alfanumérico válido (formato 2026+).
- `GET /cnpj-numerico`: Gera um CNPJ numérico válido (formato tradicional).

### Exemplos de resposta

- `/cpf`: `{"cpf": "12345678901"}`
- `/cnpj-alfanumerico`: `{"cnpj": "ABC123DEF45678"}`
- `/cnpj-numerico`: `{"cnpj": "12345678000123"}`

## Funcionalidades

- **CPF**: Gera um CPF numérico válido com 11 dígitos.
- **CNPJ Alfanumérico**: Gera um CNPJ alfanumérico válido com 14 caracteres (formato 2026+), composto por 12 caracteres alfanuméricos e 2 dígitos verificadores.
- **CNPJ Numérico**: Gera um CNPJ numérico válido com 14 dígitos, seguindo o formato tradicional.