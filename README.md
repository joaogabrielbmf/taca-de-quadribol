# Taça de Quadribol

Jogo de montagem de times e simulação de um campeonato de quadribol. Escolha uma tática e uma dificuldade, monte seu time com sete jogadores e dispute uma temporada contra as quatro casas.

## Funcionalidades

- Escolha entre as táticas Defensiva, Equilibrada e Ofensiva.
- Selecione a dificuldade: Trouxa, Bruxo ou Auror.
- Monte um time com 1 goleiro, 2 batedores, 3 artilheiros e 1 apanhador.
- Veja a escalação e a média de força do time.
- Simule oito partidas, enfrentando cada casa em jogos de ida e volta.
- Acompanhe os gols, a captura do pomo de ouro e a classificação do torneio.

## Tecnologias

- **Frontend:** React, Vite, React Router, Tailwind CSS e Axios.
- **Backend:** Node.js e Express.

O backend ainda é inicial: no momento, ele disponibiliza apenas uma rota de verificação. O jogo não está conectado ao backend nem a um banco de dados MySQL; a simulação acontece no frontend.

## Pré-requisitos

- Node.js e npm instalados.
- Git, caso queira clonar o repositório.

## Como executar

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/joaogabrielbmf/taca-de-quadribol.git
cd taca-de-quadribol
```

### Iniciar o frontend

Em um terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra no navegador o endereço local mostrado pelo Vite no terminal.

Para gerar a versão de produção do frontend:

```bash
npm run build
```

### Iniciar o backend

Em outro terminal, na pasta raiz do projeto:

```bash
cd backend
npm install
npm start
```

O servidor Express iniciará na porta `3000`. Para conferir se está funcionando, abra `http://localhost:3000`; a API deve responder:

```json
{
  "mensagem": "API de quadribol pronta."
}
```

## Estrutura do projeto

```text
backend/
  index.js              # Servidor Express
  package.json
frontend/
  src/
    pages/              # Telas do jogo
    services/           # Configuração do Axios
    App.jsx             # Rotas e estado principal
    main.jsx            # Inicialização do React
  package.json
```

## Scripts disponíveis

Na pasta `frontend`:

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Gera os arquivos de produção. |
| `npm run preview` | Visualiza localmente a versão de produção. |
| `npm run lint` | Executa o Oxlint. |

Na pasta `backend`:

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor Express. |
