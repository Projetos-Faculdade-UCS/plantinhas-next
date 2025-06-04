# Como o front-end pode consumir a API FastAPI deste projeto

## Introdução

Esta API foi construída usando FastAPI e está disponível por padrão em `http://localhost:8000` (ou no host/porta configurados). O principal endpoint está sob o router `processador`.

## Endpoints Disponíveis

Os endpoints disponíveis estão definidos em `routers/processador.py`. Para consumir a API, o front-end deve realizar requisições HTTP (GET, POST, etc.) para os endpoints expostos.

### Exemplo de Consumo (com fetch no JavaScript)

```js
fetch('http://localhost:8000/', {
  method: 'POST', // ou 'GET', conforme o endpoint
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ /* seu payload aqui */ })
})
  .then(response => response.json())
  .then(data => {
    // manipule a resposta
    console.log(data);
  })
  .catch(error => {
    // trate erros
    console.error('Erro:', error);
  });
```

### Exemplo com Axios

```js
import axios from 'axios';

axios.post('http://localhost:8000/', {
  // seu payload aqui
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
```

## Estrutura dos Dados

Abaixo estão os esquemas de dados aceitos e retornados pela API, conforme definidos em `schemas/models.py`:

### Planta

```json
{
  "nome_cientifico": "string",
  "solo_ideal": "string",
  "ventilacao": "string",
  "epoca_plantio": "string",
  "temperatura_ideal": "string",
  "dias_maturidade": 0
}
```

### Ambiente

```json
{
  "local": "string",
  "condicao": "interno" | "externo"
}
```

### EntradaPlantio

```json
{
  "data_inicio_plantio": "YYYY-MM-DD",
  "planta": { /* Planta */ },
  "quantidade": 0,
  "ambiente": { /* Ambiente */ },
  "sistemaCultivo": "string",
  "informacoes_adicionais": "string",
  "habilidades_existentes": ["string"]
}
```

### Habilidade

```json
{
  "nome": "string",
  "multiplicador_xp": 0.0
}
```

### Tarefa

```json
{
  "nome": "string",
  "tipo": "string",
  "quantidade_total": 0,
  "cron": "string",
  "habilidade": { /* Habilidade */ }
}
```

### SaidaPlantio

```json
{
  "data_fim_plantio": "YYYY-MM-DD",
  "descritivo_como_plantar": "string",
  "informacoes_adicionais": "string",
  "tarefas": [ { /* Tarefa */ } ]
}
```

## Autenticação

Se a API exigir autenticação, implemente o envio de tokens ou credenciais conforme especificado nos endpoints (não há autenticação explícita no código fornecido).

## Exemplos de Requisições

- **POST** para processar dados:
  - Endpoint: `http://localhost:8000/`
  - Body: JSON conforme modelo acima


## Observações

- Sempre envie o header `Content-Type: application/json` para endpoints que recebem JSON.
- Consulte a documentação automática do FastAPI em `http://localhost:8000/docs` para testar e visualizar todos os endpoints disponíveis.

---

> **Dica:** Use ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar a API antes de integrar ao front-end.
