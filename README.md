# 🚀 Gerador de Documentos - API Node.js (TypeScript)

Uma API robusta, escalável e bem arquitetada para gerar números de CPF e CNPJ válidos, seguindo os princípios SOLID e padrões de arquitetura em camadas.

## 📋 Características

- ✅ **Arquitetura em Camadas** - Separação clara de responsabilidades
- ✅ **SOLID Principles** - Código manutenível e testável
- ✅ **Domain-Driven Design** - Lógica de negócio bem definida
- ✅ **Injeção de Dependências** - Fácil de testar e estender
- ✅ **TypeScript** - Type safety completo
- ✅ **Geração de CPF** - Números válidos com dígitos verificadores
- ✅ **Geração de CNPJ** - Suporta formato numérico e alfanumérico (2026+)

## 🏗️ Arquitetura do Projeto

```
src/
├── domain/                    # Camada de Domínio
│   ├── entities/             # CPF, CNPJ (objetos de negócio)
│   └── services/             # Geradores de documentos
├── application/              # Camada de Aplicação
│   └── usecases/            # Casos de uso (orquestração)
├── infrastructure/           # Camada de Infraestrutura
│   ├── controllers/         # Controladores HTTP
│   ├── routes/              # Definição de rotas
│   └── http/                # Configuração do servidor
└── shared/                   # Utilitários compartilhados
    ├── dto/                 # Data Transfer Objects
    └── types/               # Tipos TypeScript
```

### Princípios SOLID Aplicados

| Princípio | Aplicação |
|-----------|-----------|
| **S** - Single Responsibility | Cada classe tem uma única razão para mudar. Ex: `CPFGenerator` gera CPF, `DocumentController` gerencia HTTP |
| **O** - Open/Closed | Aberto para extensão (novos documentos), fechado para modificação |
| **L** - Liskov Substitution | `CPFGenerator` e `CNPJGenerator` implementam `IDocumentGenerator` |
| **I** - Interface Segregation | `IDocumentGenerator` é específica, não genérica |
| **D** - Dependency Inversion | Depender de abstrações (`IDocumentGenerator`), não de implementações |

## 🚀 Como Usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Produção

```bash
npm start
```

A API estará disponível em `http://localhost:3000`

## 📡 Endpoints da API

### GET `/`
Informações sobre a API e endpoints disponíveis.

**Resposta:**
```json
{
  "message": "API de Geração de Documentos",
  "version": "2.0.0",
  "endpoints": {
    "cpf": "/cpf",
    "cnpjNumeric": "/cnpj-numerico",
    "cnpjAlphanumeric": "/cnpj-alfanumerico"
  }
}
```

### GET `/cpf`
Gera um CPF numérico válido com 11 dígitos e dígitos verificadores corretos.

**Resposta:**
```json
{
  "cpf": "12345678901"
}
```

### GET `/cnpj-numerico`
Gera um CNPJ numérico válido com 14 dígitos (formato tradicional).

**Resposta:**
```json
{
  "cnpj": "12345678000123"
}
```

### GET `/cnpj-alfanumerico`
Gera um CNPJ alfanumérico válido com 14 caracteres (formato 2026+).

**Resposta:**
```json
{
  "cnpj": "ABC123DEF45678"
}
```

## 🔍 Fluxo de Requisição

```
HTTP Request
    ↓
DocumentController (HTTP Layer)
    ↓
GenerateDocumentUseCase (Application Layer)
    ↓
CPFGenerator / CNPJGenerator (Domain Layer)
    ↓
CPF / CNPJ Entity (Domain Layer - Validação)
    ↓
HTTP Response
```

## 🧪 Estrutura de Arquivos Principais

### Domain Layer
- **Entities**: `CPF.ts`, `CNPJ.ts` - Objetos de domínio com lógica de validação
- **Services**: `CPFGenerator.ts`, `CNPJNumericGenerator.ts`, `CNPJAlphanumericGenerator.ts` - Geradores implementando `IDocumentGenerator`

### Application Layer
- **UseCases**: `GenerateDocumentUseCase.ts` - Orquestra a geração de documentos

### Infrastructure Layer
- **Controllers**: `DocumentController.ts` - Gerencia requisições HTTP
- **Routes**: `DocumentRoutes.ts` - Define as rotas da API
- **HTTP**: `Server.ts` - Configuração e injeção de dependências do Express

### Shared Layer
- **DTO**: `GeneratedDocumentDTO.ts` - Transferência de dados
- **Types**: Tipos TypeScript compartilhados

## 🔧 Configuração

### Variáveis de Ambiente

```bash
PORT=3000  # Porta padrão
```

Exemplo:
```bash
PORT=5000 npm start
```

## 📦 Dependências

- **express**: Framework web
- **typescript**: Linguagem de programação

## 🛠️ Scripts

```bash
npm run build    # Compila TypeScript para JavaScript
npm run start    # Inicia o servidor em produção
npm run dev      # Compila e inicia em desenvolvimento
```

## 🎯 Extensibilidade

Para adicionar novos tipos de documentos:

1. **Criar Entidade** em `src/domain/entities/NovoDocumento.ts`
2. **Criar Gerador** em `src/domain/services/NovoDocumentoGenerator.ts`
3. **Implementar `IDocumentGenerator`**
4. **Adicionar UseCase** em `src/application/usecases/`
5. **Adicionar Método** no `DocumentController`
6. **Adicionar Rota** em `DocumentRoutes`

Exemplo:
```typescript
// src/domain/services/RGGenerator.ts
export class RGGenerator implements IDocumentGenerator {
    public generate(): string {
        // Implementar lógica
    }
}
```

## 📝 Licença

ISC

## 👨‍💻 Autor

Desenvolvido com ❤️ seguindo princípios de clean code e SOLID