# Gerador de Documentos

Aplicação fullstack para gerar CPF e CNPJ válidos, com frontend React e API serverless.

🔗 **Demo**: [Acesse no Vercel](https://api-gerador.vercel.app)

## Estrutura do Projeto

```
├── api/                    # Serverless Functions (Vercel)
│   ├── cpf.ts
│   ├── cnpj-alfanumerico.ts
│   └── cnpj-numerico.ts
├── frontend/               # Frontend React + Vite
│   ├── src/
│   └── ...
├── src/                    # Backend Express (dev local)
│   ├── routes/
│   └── services/
└── vercel.json             # Configuração de deploy
```

## Deploy (Vercel)

O projeto está configurado para deploy automático na Vercel:

- **Frontend**: React + Vite servido como arquivos estáticos
- **API**: Serverless Functions na pasta `/api`

### Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/cpf` | Gera um CPF válido |
| GET | `/api/cnpj-alfanumerico` | Gera um CNPJ alfanumérico (formato 2026+) |
| GET | `/api/cnpj-numerico` | Gera um CNPJ numérico (formato tradicional) |

### Exemplos de resposta

```json
// GET /api/cpf
{ "cpf": "12345678901" }

// GET /api/cnpj-alfanumerico
{ "cnpj": "ABC123DEF45678" }

// GET /api/cnpj-numerico
{ "cnpj": "12345678000123" }
```

## Desenvolvimento Local

### Backend (Express)

```bash
npm install
npm run dev
# API rodando em http://localhost:3000
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# Frontend rodando em http://localhost:5173
```

## Funcionalidades

- **CPF**: Gera CPF numérico válido com 11 dígitos
- **CNPJ Alfanumérico**: Gera CNPJ alfanumérico válido com 14 caracteres (formato 2026+)
- **CNPJ Numérico**: Gera CNPJ numérico válido com 14 dígitos (formato tradicional)

## Tecnologias

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Deploy**: Vercel (Serverless Functions)