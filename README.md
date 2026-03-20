# 🧙 Dungeon Master API

API backend para gerenciamento de dados de RPG (nomes, raças, classes), com suporte a paginação, filtros dinâmicos e arquitetura escalável.

---

## 🚀 Tecnologias

* Node.js
* Express
* MySQL
* Arquitetura em camadas (Controller, Service, Repository)
* DTO Pattern
* Query dinâmica (filtros, ordenação, paginação)

---

## 📁 Estrutura do Projeto

```bash
src/
 ├── controllers/
 │    ├── names/
 │    ├── races/
 │    └── classes/
 │
 ├── services/
 │
 ├── repositories/
 │
 ├── dtos/
 │    ├── namesDTO.js
 │    ├── paginationDTO.js
 │
 ├── helpers/
 │    └── paginationHelper.js
 │
 ├── middlewares/
 │    └── asyncHandler.js
 │
 ├── routes/
 │
 └── config/
      └── db.js
```

---

## 🧠 Arquitetura

A API segue o padrão:

```
Controller → Service → Repository → Database
                    ↓
                   DTO
```

### 🔹 Controller

Responsável por receber a requisição HTTP e retornar a resposta.

### 🔹 Service

Contém a regra de negócio e orquestra os dados.

### 🔹 Repository

Responsável por acesso ao banco de dados.

### 🔹 DTO

Padroniza os dados de entrada e saída da API.

---

## 📄 Paginação

A API suporta paginação padrão via query params:

```bash
GET /api/names?page=1&limit=10
```

### 🔹 Exemplo de resposta

```json
{
  "success": true,
  "data": [],
  "meta": {
    "total": 361,
    "page": 1,
    "limit": 10,
    "lastPage": 37,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 🔍 Filtros dinâmicos

Suporte a filtros diretamente via query:

```bash
GET /api/names?race_id=2
GET /api/names?gender_id=1
GET /api/names?race_id=2&gender_id=1
```

---

## 🔎 Busca (Search)

```bash
GET /api/names?search=ae
```

---

## 🔃 Ordenação

```bash
GET /api/names?sort=nome&order=asc
GET /api/names?sort=id&order=desc
```

---

## 🎲 Endpoint especial (Random)

Retorna um nome aleatório baseado em gênero e raça:

```bash
GET /api/names/random/:gender_id/:race_id
```

### 🔹 Exemplo

```bash
GET /api/names/random/1/2
```

---

## 🧱 BaseRepository

A API utiliza um repositório base genérico com suporte a:

* Paginação
* Filtros dinâmicos
* Busca (LIKE)
* Ordenação segura

Isso evita duplicação de código entre entidades.

---

## 🧩 Helpers

### paginationHelper

Responsável por padronizar o objeto de metadados:

```js
buildPaginationMeta(total, pagination)
```

---

## ⚠️ Boas práticas aplicadas

* Separação de responsabilidades
* DTO para controle de saída
* Query segura (prepared statements)
* Limite máximo de paginação
* Estrutura escalável

---

## 📌 Próximos passos

* [ ] Filtros com múltiplos valores (IN)
* [ ] Filtros por range (BETWEEN)
* [ ] Seleção dinâmica de campos (fields)
* [ ] Cache (Redis)
* [ ] Autenticação (JWT)

---

## 👨‍💻 Autor

Desenvolvido por Luiz Junior
