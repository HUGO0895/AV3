# Documentação do Back-End — AEROCODE

## Visão Geral

API REST desenvolvida em **Node.js + TypeScript** com **Express** e **Prisma ORM**. Gerencia aeronaves, peças, etapas de manutenção, testes e funcionários, com autenticação JWT e controle de permissões por nível de acesso.

**Base URL:** `http://localhost:3000`

---

## Autenticação

A API utiliza **JWT (JSON Web Token)**. A maioria dos endpoints exige o token no header da requisição:

```
Authorization: Bearer <token>
```

O token é obtido via endpoint de login e expira em **8 horas**.

### Níveis de Permissão

| Permissão      | Descrição                                  |
|----------------|--------------------------------------------|
| `ADMINISTRADOR`| Acesso total (leitura, escrita e exclusão) |
| `ENGENHEIRO`   | Pode criar e atualizar registros           |
| `OPERADOR`     | Apenas leitura                             |

---

## Padrão de Resposta

Todas as respostas seguem o formato:

```json
{
  "status": "sucess" | "error",
  "resposta": <dados ou mensagem de erro>
}
```

---

## Endpoints

### 🔐 Autenticação

#### `POST /login`
Autentica um funcionário e retorna o token JWT.

**Sem autenticação necessária.**

**Body:**
```json
{
  "usuario": "admin",
  "senha": "admin123"
}
```

**Resposta de sucesso `200`:**
```json
{
  "status": "sucess",
  "resposta": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "nivelPermissao": "ADMINISTRADOR"
  }
}
```

**Erros:**
- `401` — Usuário não encontrado ou senha incorreta
- `400` — Erro interno ao realizar login

---

### ✈️ Aeronaves

#### `GET /aeronaves`
Retorna todas as aeronaves cadastradas.

**Permissão:** autenticado (qualquer nível)

**Resposta `200`:**
```json
{
  "status": "sucess",
  "resposta": [ /* lista de aeronaves */ ]
}
```

---

#### `POST /aeronaves`
Cadastra uma nova aeronave.

**Permissão:** `ADMINISTRADOR` ou `ENGENHEIRO`

**Body:**
```json
{
  "id": "string",
  "modelo": "string",
  "capacidade": 150,
  "alcance": 5000,
  "tipo": "COMERCIAL" 
}
```

> `tipo` é um enum `tipoAero` definido no schema Prisma.

---

#### `PUT /aeronaves`
Atualiza dados de uma aeronave existente.

**Permissão:** `ADMINISTRADOR` ou `ENGENHEIRO`

**Body:**
```json
{
  "id": "string",
  "modelo": "string",
  "capacidade": 150,
  "alcance": 5000,
  "tipo": "COMERCIAL"
}
```

---

#### `DELETE /aeronaves/:id`
Remove uma aeronave pelo ID.

**Permissão:** `ADMINISTRADOR`

**Parâmetro de rota:** `id` — identificador da aeronave

---

### 🔩 Peças

#### `GET /peca/:id`
Retorna as peças de uma aeronave específica.

**Permissão:** autenticado (qualquer nível)

**Parâmetro de rota:** `id` — ID da aeronave

---

#### `POST /peca`
Cadastra uma nova peça para uma aeronave.

**Permissão:** `ADMINISTRADOR` ou `ENGENHEIRO`

**Body:**
```json
{
  "aeronave_id": "string",
  "nome": "string",
  "tipo": "MOTOR",
  "fornecedor": "string"
}
```

> `tipo` é um enum `TipoPecas`.

---

#### `PUT /peca`
Atualiza dados de uma peça existente.

**Permissão:** `ADMINISTRADOR` ou `ENGENHEIRO`

**Body:**
```json
{
  "aeronave_id": "string",
  "nome": "string",
  "tipo": "MOTOR",
  "fornecedor": "string",
  "status": "DISPONIVEL"
}
```

> `tipo` é `TipoPecas` (opcional na atualização). `status` é um enum `TipoStatus` (opcional).

---

#### `DELETE /peca/:id/:nome`
Remove uma peça pelo ID da aeronave e nome da peça.

**Permissão:** `ADMINISTRADOR`

**Parâmetros de rota:** `id` — ID da aeronave, `nome` — nome da peça

---

### 📋 Etapas

#### `GET /etapas/:id`
Retorna as etapas de manutenção de uma aeronave.

**Permissão:** autenticado (qualquer nível)

**Parâmetro de rota:** `id` — ID da aeronave

---

#### `POST /etapas`
Cria uma nova etapa de manutenção.

**Permissão:** `ADMINISTRADOR` ou `ENGENHEIRO`

**Body:**
```json
{
  "nome": "string",
  "prazo": "2024-12-31",
  "aeronave_id": "string",
  "funcionarios": [1, 2, 3]
}
```

> `funcionarios` é opcional — array de IDs de funcionários associados à etapa.

---

#### `PUT /etapas`
Atualiza uma etapa existente.

**Permissão:** `ADMINISTRADOR` ou `ENGENHEIRO`

**Body:**
```json
{
  "nome": "string",
  "prazo": "2024-12-31",
  "status": "EM_ANDAMENTO",
  "aeronave_id": "string",
  "funcionarios": [1, 2]
}
```

> `status` é um enum `Status`.

---

#### `DELETE /etapas/:id/:nome`
Remove uma etapa de manutenção.

**Permissão:** `ADMINISTRADOR`

**Parâmetros de rota:** `id` — ID da aeronave, `nome` — nome da etapa

---

### 🧪 Testes

#### `GET /testes/:id`
Retorna os testes realizados em uma aeronave.

**Permissão:** autenticado (qualquer nível)

**Parâmetro de rota:** `id` — ID da aeronave

---

#### `POST /testes`
Registra um novo teste para uma aeronave.

**Permissão:** `ADMINISTRADOR` ou `ENGENHEIRO`

**Body:**
```json
{
  "tipo": "ESTRUTURAL",
  "aeronave_id": "string"
}
```

> `tipo` é um enum `Tipo`.

---

#### `PUT /testes`
Atualiza o resultado de um teste.

**Permissão:** `ADMINISTRADOR` ou `ENGENHEIRO`

**Body:**
```json
{
  "tipo": "ESTRUTURAL",
  "resultado": "APROVADO",
  "aeronave_id": "string"
}
```

> `resultado` é um enum `Resultado`.

---

#### `DELETE /testes/:id/:nome`
Remove um teste. O parâmetro `nome` deve ser um valor válido do enum `Tipo`.

**Permissão:** `ADMINISTRADOR`

**Parâmetros de rota:** `id` — ID da aeronave, `nome` — tipo do teste (valor do enum `Tipo`)

---

### 👤 Funcionários

#### `GET /funcionarios`
Retorna todos os funcionários cadastrados.

**Permissão:** autenticado (qualquer nível)

---

#### `POST /funcionarios`
Cadastra um novo funcionário.

**Permissão:** `ADMINISTRADOR`

**Body:**
```json
{
  "nome": "string",
  "telefone": "string",
  "endereco": "string",
  "usuario": "string",
  "senha": "string",
  "nivelPermissao": "OPERADOR"
}
```

---

#### `PUT /funcionarios`
Atualiza dados de um funcionário.

**Permissão:** `ADMINISTRADOR`

**Body:**
```json
{
  "usuario": "string",
  "nome": "string",
  "telefone": "string",
  "endereco": "string",
  "nivelPermissao": "ENGENHEIRO"
}
```

> Apenas `usuario` e `nivelPermissao` são obrigatórios; os demais campos são opcionais.

---

#### `DELETE /funcionarios/:usuario`
Remove um funcionário pelo nome de usuário.

**Permissão:** `ADMINISTRADOR`

**Parâmetro de rota:** `usuario` — nome de usuário do funcionário

---

## Seed Inicial

Ao iniciar o servidor, são criados automaticamente três usuários padrão (caso ainda não existam):

| Nome        | Usuário | Senha    | Permissão       |
|-------------|---------|----------|-----------------|
| Admin       | admin   | admin123 | ADMINISTRADOR   |
| Engenheiro  | eng     | eng123   | ENGENHEIRO      |
| Operador    | op      | op123    | OPERADOR        |

---

## Resumo das Permissões por Endpoint

| Recurso         | GET        | POST                          | PUT                           | DELETE          |
|-----------------|------------|-------------------------------|-------------------------------|-----------------|
| `/aeronaves`    | Autenticado| ADMIN / ENGENHEIRO            | ADMIN / ENGENHEIRO            | ADMIN           |
| `/peca`         | Autenticado| ADMIN / ENGENHEIRO            | ADMIN / ENGENHEIRO            | ADMIN           |
| `/etapas`       | Autenticado| ADMIN / ENGENHEIRO            | ADMIN / ENGENHEIRO            | ADMIN           |
| `/testes`       | Autenticado| ADMIN / ENGENHEIRO            | ADMIN / ENGENHEIRO            | ADMIN           |
| `/funcionarios` | Autenticado| ADMIN                         | ADMIN                         | ADMIN           |
| `/login`        | —          | Público                       | —                             | —               |

---
# Documentação do Frontend — Aerocode

## Visão Geral

Interface web desenvolvida em **React + TypeScript** com **Tailwind CSS**. Consome a API REST do backend via uma camada de serviços genérica, utilizando `localStorage` para persistência do token JWT.

**Porta de desenvolvimento:** `http://localhost:5173`  
**API consumida:** `http://localhost:3000`

---

## Estrutura do Projeto

```
src/
├── types/              # Interfaces TypeScript (contratos de dados)
│   ├── aeronave.ts
│   ├── etapas.ts
│   ├── funcionario.ts
│   ├── pecas.ts
│   └── teste.ts
├── service/            # Camada de serviços (requisições HTTP)
│   ├── Service.ts      # Classe base genérica
│   ├── AeronaveService.ts
│   ├── EtapasService.ts
│   ├── FuncService.ts
│   ├── PecaService.ts
│   └── TesteService.ts
└── pages/              # Páginas da aplicação
    ├── login.tsx
    ├── aeronaves.tsx
    ├── etapas.tsx
    ├── pecas.tsx
    ├── testes.tsx
    ├── funcionarios.tsx
    └── relatorio.tsx
```

---

## Autenticação

O login é feito na página `/login`. Após autenticação bem-sucedida, dois valores são armazenados no `localStorage`:

| Chave           | Valor                          |
|-----------------|--------------------------------|
| `token`         | JWT Bearer token (validade 8h) |
| `nivelPermissao`| Nível do usuário logado        |

O token é lido automaticamente pela classe `Service` e injetado como header `Authorization: Bearer <token>` em todas as requisições subsequentes.

---

## Camada de Serviços

### `Service.ts` — Classe Base Genérica

Todos os serviços herdam desta classe abstrata. Ela encapsula os 4 métodos HTTP principais:

```
Service<T, K, C>
  T = tipo do payload de criação
  K = tipo do payload de atualização
  C = tipo do identificador para deleção (string ou Array<string>)
```

| Método             | HTTP   | Descrição                                                                                     |
|--------------------|--------|-----------------------------------------------------------------------------------------------|
| `get(id?)`         | GET    | Busca todos os registros ou filtra por ID. Se `id` for string, adiciona `/:id` à URL.        |
| `create(elemento)` | POST   | Envia o payload como JSON no body.                                                            |
| `update(elemento)` | PUT    | Envia o payload como JSON no body.                                                            |
| `delete(id)`       | DELETE | Se `id` for array, concatena os valores separados por `/` na URL (ex: `/peca/:id/:nome`).    |

**Resolução do DELETE com array:**

```typescript
// delete(["abc123", "Motor Principal"])
// → DELETE /peca/abc123/Motor%20Principal
```

### Serviços Disponíveis

| Serviço           | URL Base                       | Tipo de delete |
|-------------------|--------------------------------|----------------|
| `AeroServ`        | `/aeronaves`                   | `string`       |
| `EtapaServ`       | `/etapas`                      | `Array<string>`|
| `PecaServ`        | `/peca`                        | `Array<string>`|
| `TesteServ`       | `/testes`                      | `Array<string>`|
| `FuncServ`        | `/funcionarios`                | `string`       |

Todos são exportados como **instâncias singleton** — basta importar e usar diretamente.

---

## Páginas

### Login (`/login`)

Formulário de autenticação. Ao submeter, chama `POST /login`, armazena o token e redireciona para `/aeronaves`.

**Estados:**
- `usuario`, `senha` — campos controlados
- `erro` — mensagem de erro exibida abaixo do formulário
- `loading` — desabilita o botão durante a requisição

---

### Aeronaves (`/aeronaves`)

Página simples que renderiza a `Navbar` e o componente `VerAeronaves`. A lógica de listagem, criação, edição e exclusão está encapsulada dentro do componente.

---

### Etapas (`/etapas`)

Gerenciamento de etapas de manutenção vinculadas a uma aeronave.

**Funcionalidades:**
- Selecionar aeronave via `<select>` para carregar suas etapas
- Filtrar etapas por **nome** (busca de texto) e **status** (`TODOS`, `ANDAMENTO`, `PENDENTE`, `CONCLUIDA`)
- Abrir modal de cadastro de nova etapa
- Auto-refresh de aeronaves a cada **10 segundos**

**Estados principais:**
- `aeronaves` — lista carregada na montagem e atualizada periodicamente
- `aeronaveSelecionada` — aeronave ativa; define qual `id` é usado ao buscar etapas
- `etapas` — lista de etapas da aeronave selecionada
- `modalCadastro` — controla visibilidade do modal
- `BuscaNome`, `Status` — filtros aplicados localmente

---

### Peças (`/pecas`)

Página simples que renderiza a `Navbar` e o componente `VerPecas`. Lógica interna no componente.

---

### Testes (`/testes`)

Controle de qualidade — testes vinculados a aeronaves.

**Funcionalidades:**
- Selecionar aeronave para visualizar seus testes
- Abrir modal de cadastro de novo teste
- Recarregar lista após operações

**Estados principais:**
- `aeronaves` — carregadas na montagem via `AeroServ.get()`
- `aeronave_id` — ID selecionado; mudança dispara `useEffect` que busca os testes
- `testes` — lista de testes da aeronave selecionada
- `modalCadastro` — controla visibilidade do modal

---

### Funcionários (`/funcionarios`)

Gerenciamento completo da equipe.

**Funcionalidades:**
- Listar todos os funcionários em grid de cards
- Filtrar por **nome** e por **nível de permissão** (`TODOS`, `ENGENHEIRO`, `OPERADOR`, `ADMINISTRADOR`)
- Modais para: cadastrar, editar, visualizar perfil e deletar funcionário
- Badges coloridos por nível de permissão:
  - `ADMINISTRADOR` → roxo
  - `ENGENHEIRO` → azul
  - `OPERADOR` → laranja

**Estados principais:**
- `funcionarios` — lista carregada na montagem
- `funcSel` — funcionário selecionado para operações modais
- `nome`, `nivel` — filtros locais
- `modalCad`, `modalEdit`, `modalDel`, `modalVer` — controles de visibilidade dos modais

---

### Relatório (`/relatorio`)

Geração de relatório técnico completo em PDF via **jsPDF**.

**Funcionalidades:**
- Selecionar aeronave e preencher **cliente** e **prazo final**
- Visualizar prévia com peças, etapas e testes carregados automaticamente
- Exportar PDF com layout corporativo (logo, cabeçalho colorido, rodapé)

**Regras para habilitar a geração do PDF:**

Todas as condições abaixo precisam ser satisfeitas:

| Condição                                        | Mensagem exibida se não atendida                                 |
|-------------------------------------------------|------------------------------------------------------------------|
| Campo `cliente` preenchido                      | "Preencha o cliente."                                           |
| Campo `prazo` preenchido                        | "Preencha o prazo final."                                       |
| Todas as etapas com `status === 'CONCLUIDA'`    | "Existem etapas não concluídas."                                |
| Todos os testes com `resultado === 'APROVADO'`  | "Existem testes não aprovados."                                 |
| Todas as etapas com funcionários responsáveis   | "Todas as etapas precisam ter funcionários responsáveis."       |

**Estrutura do PDF gerado:**
1. Cabeçalho azul com logo e título
2. Card com dados da aeronave (modelo, ID, tipo, capacidade, alcance, cliente, prazo)
3. Seção de peças registradas
4. Seção de etapas com equipe responsável e prazo
5. Tabela de testes com resultado colorido (verde/vermelho)
6. Rodapé com identificação do sistema e número de página

**Nome do arquivo exportado:**  
`relatorio_<aeronave_id>_<data_atual>.pdf`

---

## Tipos (Interfaces TypeScript)

### Aeronave

```typescript
interface ResponseAero {
  id: string
  modelo: string
  capacidade: number
  alcance: number
  tipo: "COMERCIAL" | "MILITAR"
}
```

### Etapa

```typescript
interface responseEtapa {
  nome: string
  prazo: string
  status: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA"
  aeronave_id: string
  funcionarios?: Array<string>
}
```

### Peça

```typescript
interface ResponsePeca {
  aeronave_id: string
  nome: string
  tipo: "NACIONAL" | "IMPORTADA"
  fornecedor: string
  status: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA"
}
```

### Teste

```typescript
interface ResponseTips {
  tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO"
  resultado: "APROVADO" | "REPROVADO" | "PENDENTE"
  aeronave_id: string
}
```

### Funcionário

```typescript
interface ResponseFuncionario {
  id: number
  nome: string
  telefone: string
  endereco: string
  usuario: string
  nivelPermissao: "ADMINISTRADOR" | "ENGENHEIRO" | "OPERADOR"
}
```

---

## Dependências Relevantes

| Pacote           | Uso                                              |
|------------------|--------------------------------------------------|
| `react-router-dom` | Navegação entre páginas                        |
| `tailwindcss`    | Estilização utilitária                           |
| `jspdf`          | Geração de PDF no cliente (página de relatório)  |
| `lucide-react`   | Ícones utilizados na página de relatório         |

---

## Padrões de Uso dos Serviços

```typescript
// Buscar todos
const resposta = await AeroServ.get(undefined)
if (resposta.status === 'sucess') setAeronaves(resposta.resposta)

// Buscar por ID
const resposta = await EtapaServ.get(aeronave_id)

// Criar
await PecaServ.create({ aeronave_id, nome, tipo, fornecedor })

// Atualizar
await TesteServ.update({ tipo, resultado, aeronave_id })

// Deletar (por array para endpoints com múltiplos params)
await PecaServ.delete([aeronave_id, nome])

// Deletar (por string simples)
await FuncServ.delete(usuario)
```

## Stack Técnica

- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Autenticação:** JWT (`jsonwebtoken`) + hash de senhas (`bcryptjs`)
- **CORS:** habilitado para `http://localhost:5173`
- **Porta:** `3000`
