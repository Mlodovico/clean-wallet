# Clean Wallet

API backend em **NestJS** para gestão de carteiras digitais, organizada em **Clean Architecture** com domínios explícitos, casos de uso na camada de aplicação e observabilidade via **OpenTelemetry**.

## O que é

O **clean-wallet** modela três contextos de negócio:

| Domínio | Responsabilidade |
|---|---|
| **Client** | Cadastro e gestão de clientes |
| **Wallet** | Carteiras vinculadas a um cliente |
| **Balance** | Movimentações e saldo (depósitos, limites, transações) |

A API expõe endpoints REST para criar e listar recursos. As regras de validação ficam no domínio (Value Objects e agregados); a orquestração fica nos use cases; a persistência é feita via repositórios TypeORM.

## Arquitetura

O projeto separa responsabilidades em camadas:

```
src/
├── domain/           # Regras de negócio, entidades, VOs e ports
├── application/      # Use cases (uma ação por arquivo)
├── infrastructure/   # TypeORM, repositórios concretos, database
├── presentation/     # Controllers, services HTTP, módulos Nest
└── shared/           # Utilitários compartilhados (ex.: Result)
```

### Fluxo de uma requisição

```
HTTP Request
  → Controller (presentation)
  → Service (presentation)
  → Use Case (application)
  → Agregado.create() (domain)   # valida VOs e regras
  → Repository Port (domain)
  → Repository impl (infrastructure)   # persiste no PostgreSQL
  → Resposta com agregado de domínio
```

Cada domínio segue o mesmo padrão:

```
presentation/<domínio>/
application/<domínio>/create-<domínio>.use-case.ts
domain/<domínio>/ports/<domínio>-repository.port.ts
infrastructure/repositories/<Domínio>Repository.ts
```

### Padrões utilizados

- **Agregados** (`Client`, `Wallet`, `Balance`) com factory `create()` retornando `Result<T>`
- **Value Objects** para validar email, telefone, moeda, valores monetários, etc.
- **Ports & Adapters** — interfaces de repositório no domínio, implementação na infraestrutura
- **Use cases** — classes `@Injectable()` com método `execute(input)`

## Stack

- [NestJS](https://nestjs.com/) 11
- [TypeORM](https://typeorm.io/) + PostgreSQL 16
- [OpenTelemetry](https://opentelemetry.io/) (traces via OTLP)
- TypeScript, Jest, pnpm

## Pré-requisitos

- Node.js 20+
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (para PostgreSQL e, opcionalmente, o collector OTEL)

## Configuração

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=clean-wallet-db
```

> O PostgreSQL do Docker expõe a porta `5433` por padrão (mapeamento em `docker-compose.yml`).

## Executando

### Ambiente completo (banco + app)

Sobe o PostgreSQL e inicia a API em modo watch:

```bash
pnpm dev
```

### Apenas o banco

```bash
pnpm db:up      # sobe PostgreSQL
pnpm db:down    # para containers
pnpm db:logs    # acompanha logs
```

### Apenas a aplicação

Com o banco já rodando:

```bash
pnpm start:dev
```

Outros scripts úteis:

```bash
pnpm build        # compila para dist/
pnpm start        # executa build com OpenTelemetry
pnpm start:prod   # produção (dist/)
pnpm lint         # ESLint
```

A API fica disponível em `http://localhost:3000` (ou na porta definida em `PORT`).

## API

### Clients

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/clients` | Lista clientes (em memória na camada de apresentação) |
| `GET` | `/clients/:id` | Busca cliente por ID |
| `POST` | `/clients` | Cria cliente |
| `PUT` | `/clients/:id` | Atualiza cliente |

**Exemplo — criar cliente:**

```bash
curl -X POST http://localhost:3000/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Murilo Lodovico",
    "phone": "11999999999",
    "email": "murilo@example.com",
    "birthDate": "1990-05-15",
    "document": "52998224725",
    "password": "Password1!",
    "status": "active"
  }'
```

### Wallets

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/wallets` | Lista carteiras |
| `POST` | `/wallets` | Cria carteira |

**Exemplo — criar carteira:**

```bash
curl -X POST http://localhost:3000/wallets \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "550e8400-e29b-41d4-a716-446655440000",
    "walletType": "personal",
    "currency": 986,
    "walletLimit": 5000
  }'
```

> `walletType` aceita: `personal` ou `business`.

### Balances

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/balances` | Lista saldos/movimentações |
| `POST` | `/balances` | Registra movimentação de saldo |

**Exemplo — criar balance:**

```bash
curl -X POST http://localhost:3000/balances \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 150.75,
    "overdraftLimit": 50,
    "currency": "BRL",
    "transactionType": "deposit",
    "transactionId": "txn-abc-123",
    "description": "Initial balance"
  }'
```

## Observabilidade

A instrumentação OpenTelemetry fica em `instrumentation.ts` na raiz do projeto. Em desenvolvimento ela é carregada automaticamente via `start:dev`.

Para subir o **OpenTelemetry Collector** local:

```bash
docker compose -f docker-compose.observability.yml up -d
```

O collector escuta nas portas **4317** (gRPC) e **4318** (HTTP) e usa a config em `otel-collector-config.yaml`.

## Resiliência

A aplicação inclui mecanismos para tolerar falhas transitórias e expor saúde operacional:

| Mecanismo | Onde | Função |
|---|---|---|
| **Health checks** | `GET /health/live`, `GET /health/ready` | Liveness (app no ar) e readiness (banco acessível) |
| **Retry com backoff** | `src/shared/resilience/retry.ts` | Reexecuta operações em falhas transitórias (rede/DB) |
| **Pool + reconexão DB** | `DatabaseModule` | `retryAttempts`, `retryDelay` e pool configuráveis |
| **Graceful shutdown** | `main.ts` | Encerra conexões ao receber `SIGTERM`/`SIGINT` |

Variáveis opcionais no `.env`:

```env
DB_RETRY_ATTEMPTS=10
DB_RETRY_DELAY_MS=3000
DB_CONNECT_TIMEOUT_MS=10000
DB_POOL_MAX=10
DB_POOL_IDLE_TIMEOUT_MS=30000
```

Exemplos:

```bash
curl http://localhost:3000/health/live
curl http://localhost:3000/health/ready
```

## Testes

```bash
pnpm test          # testes unitários
pnpm test:watch    # modo interativo
pnpm test:cov      # cobertura (relatório em coverage/)
```

Os testes cobrem:

- Agregados de domínio (`Client`, `Wallet`, `Balance`)
- Use cases de criação
- Services de apresentação
- Repositórios (com TypeORM mockado)
- Utilitários de resiliência (`withRetry`, `isTransientError`)
- Utilitário `Result`

Fixtures compartilhadas em `src/testing/fixtures/domain.fixtures.ts`.

## Estrutura de pastas (resumo)

```
clean-wallet/
├── instrumentation.ts          # bootstrap OpenTelemetry
├── otel-collector-config.yaml
├── docker-compose.yml            # PostgreSQL
├── docker-compose.observability.yml
├── scripts/
│   ├── start-dev.sh
│   └── stop-dev.sh
├── test/
│   ├── fixtures/
│   └── mocks/
└── src/
    ├── application/
    │   ├── client/create-client.use-case.ts
    │   ├── wallet/create-wallet.use-case.ts
    │   └── balance/create-balance.use-case.ts
    ├── domain/
    │   ├── client/
    │   ├── wallet/
    │   └── balance/
    ├── infrastructure/
    │   ├── database/
    │   ├── health/
    │   └── repositories/
    ├── shared/
    │   └── resilience/
    ├── presentation/
    │   ├── client/
    │   ├── wallet/
    │   ├── balance/
    │   └── app.module.ts
    └── main.ts
```

## Licença

Projeto privado — `UNLICENSED`.
