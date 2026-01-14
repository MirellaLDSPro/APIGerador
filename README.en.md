# Document Generator - Node.js API

This API generates valid CPF and CNPJ numbers.

## How to use

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. The API will be running on `http://localhost:3000`

## Endpoints

- `GET /`: API information and available endpoints.
- `GET /cpf`: Generates a valid numeric CPF.
- `GET /cnpj-alfanumerico`: Generates a valid alphanumeric CNPJ (2026+ format).
- `GET /cnpj-numerico`: Generates a valid numeric CNPJ (traditional format).

### Response examples

- `/cpf`: `{"cpf": "12345678901"}`
- `/cnpj-alfanumerico`: `{"cnpj": "ABC123DEF45678"}`
- `/cnpj-numerico`: `{"cnpj": "12345678000123"}`

## Features

- **CPF**: Generates a valid numeric CPF with 11 digits.
- **Alphanumeric CNPJ**: Generates a valid alphanumeric CNPJ with 14 characters (2026+ format), consisting of 12 alphanumeric characters and 2 verification digits.
- **Numeric CNPJ**: Generates a valid numeric CNPJ with 14 digits, following the traditional format.